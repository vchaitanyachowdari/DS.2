/**
 * Audio Generation Job Processor
 * Handles background processing of Audio Overview generation
 */
const { supabase } = require('../config/database');
const { generateAudioOverview } = require('../services/audio.service');
const { nanoid } = require('nanoid');

/**
 * Process audio generation job
 * @param {Object} job - Bull job object
 * @returns {Promise<Object>} Result with audio details
 */
async function processAudioGeneration(job) {
    const { jobId, userId, sourceUrl, options } = job.data;

    console.log(`\n=== Starting Audio Generation Job ${jobId} ===`);
    console.log(`User: ${userId}`);
    console.log(`Source: ${sourceUrl}`);

    try {
        // Update job status to processing
        await updateJobProgress(jobId, {
            status: 'processing',
            progress: {
                step: 'starting',
                percentage: 0,
                message: 'Starting audio generation...'
            }
        });

        // Generate audio overview with progress tracking
        const result = await generateAudioOverview(
            sourceUrl,
            jobId,
            options || {},
            async (progress) => {
                // Update progress in database
                await updateJobProgress(jobId, {
                    progress: {
                        step: progress.step,
                        percentage: progress.percentage,
                        message: progress.message
                    }
                });
            }
        );

        // Create audio record in database
        const { data: audio, error: audioError } = await supabase
            .from('audio_overviews')
            .insert([
                {
                    id: `audio_${nanoid(12)}`,
                    user_id: userId,
                    job_id: jobId,
                    title: result.title,
                    description: result.description,
                    audio_url: result.audioUrl,
                    duration: result.durationSeconds,
                    duration_formatted: result.duration,
                    topics: result.topics,
                    key_takeaways: result.keyTakeaways,
                    dialogue: result.dialogue,
                    turn_count: result.turnCount,
                    source_url: sourceUrl,
                    source_title: result.sourceTitle
                }
            ])
            .select()
            .single();

        if (audioError) {
            console.error('Failed to save audio record:', audioError);
            // Don't fail the job, audio file is already generated
        }

        // Update job to completed
        await updateJobProgress(jobId, {
            status: 'completed',
            progress: {
                step: 'completed',
                percentage: 100,
                message: 'Audio Overview generated successfully!'
            },
            audio_id: audio?.id || null,
            result: {
                audioUrl: result.audioUrl,
                title: result.title,
                duration: result.duration
            },
            completed_at: new Date().toISOString()
        });

        // Update user stats
        await updateUserStats(userId, 'audio_generated');

        // Update daily limits
        await incrementDailyLimit(userId, 'audio_generated');

        console.log(`=== Job ${jobId} completed successfully ===\n`);

        return {
            success: true,
            audioId: audio?.id,
            audioUrl: result.audioUrl,
            title: result.title,
            duration: result.duration
        };
    } catch (error) {
        console.error(`✗ Job ${jobId} failed:`, error.message);

        // Update job to failed
        await updateJobProgress(jobId, {
            status: 'failed',
            error: error.message,
            progress: {
                step: 'failed',
                percentage: 0,
                message: `Failed: ${error.message}`
            }
        });

        throw error;
    }
}

/**
 * Update job progress in database
 */
async function updateJobProgress(jobId, updates) {
    const { error } = await supabase
        .from('audio_generation_jobs')
        .update(updates)
        .eq('id', jobId);

    if (error) {
        console.error('Failed to update job progress:', error.message);
    }
}

/**
 * Update user statistics
 */
async function updateUserStats(userId, field) {
    try {
        const { data: stats } = await supabase
            .from('user_stats')
            .select(field)
            .eq('user_id', userId)
            .single();

        if (stats) {
            await supabase
                .from('user_stats')
                .update({ [field]: (stats[field] || 0) + 1 })
                .eq('user_id', userId);
        }
    } catch (error) {
        console.error('Failed to update user stats:', error.message);
    }
}

/**
 * Increment daily limit counter
 */
async function incrementDailyLimit(userId, field) {
    try {
        const today = new Date().toISOString().split('T')[0];

        const { data: existing } = await supabase
            .from('daily_limits')
            .select('*')
            .eq('user_id', userId)
            .eq('date', today)
            .single();

        if (existing) {
            await supabase
                .from('daily_limits')
                .update({ [field]: (existing[field] || 0) + 1 })
                .eq('user_id', userId)
                .eq('date', today);
        } else {
            await supabase
                .from('daily_limits')
                .insert([
                    {
                        user_id: userId,
                        date: today,
                        [field]: 1
                    }
                ]);
        }
    } catch (error) {
        console.error('Failed to update daily limits:', error.message);
    }
}

module.exports = {
    processAudioGeneration
};
