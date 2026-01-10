/**
 * Audio Generation Controller
 * Handles API endpoints for Audio Overview generation (NotebookLM-style)
 */
const { supabase } = require('../config/database');
const { AppError, asyncHandler } = require('../middleware/errorHandler');
const { audioGenerationQueue } = require('../jobs/queue');
const { checkAudioGenerationAvailability, getAvailableVoices } = require('../services/audio.service');
const { nanoid } = require('nanoid');
const { validationResult } = require('express-validator');

/**
 * @route   POST /api/audio/generate
 * @desc    Start audio overview generation from URL
 * @access  Private
 */
const startAudioGeneration = asyncHandler(async (req, res) => {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new AppError('Invalid input: ' + errors.array()[0].msg, 400);
    }

    const { url, options } = req.body;
    const userId = req.userId;

    // Validate URL format
    try {
        new URL(url);
    } catch (error) {
        throw new AppError('Invalid URL format', 400);
    }

    // Check daily limit (3 audio generations per day)
    const today = new Date().toISOString().split('T')[0];
    const { data: limits } = await supabase
        .from('daily_limits')
        .select('audio_generated')
        .eq('user_id', userId)
        .eq('date', today)
        .single();

    if (limits && limits.audio_generated >= 3) {
        throw new AppError('Daily audio generation limit reached (3/day). Try again tomorrow!', 429);
    }

    // Generate unique job ID
    const jobId = `audio_${nanoid(12)}`;

    // Create job entry in database
    const { error: jobError } = await supabase
        .from('audio_generation_jobs')
        .insert([
            {
                id: jobId,
                user_id: userId,
                source_url: url,
                options: options || {},
                status: 'queued',
                progress: {
                    step: 'queued',
                    percentage: 0,
                    message: 'Audio generation queued...'
                }
            }
        ]);

    if (jobError) {
        console.error('Failed to create job:', jobError);
        throw new AppError('Failed to start audio generation', 500);
    }

    // Add job to Bull queue
    try {
        await audioGenerationQueue.add(
            {
                jobId,
                userId,
                sourceUrl: url,
                options: options || {}
            },
            {
                jobId,
                timeout: 600000, // 10 minutes timeout
                removeOnComplete: true,
                removeOnFail: false
            }
        );

        console.log(`✓ Audio generation job ${jobId} queued for user ${userId}`);
    } catch (error) {
        // If queue fails, update job status
        await supabase
            .from('audio_generation_jobs')
            .update({
                status: 'failed',
                error: 'Failed to queue job: ' + error.message
            })
            .eq('id', jobId);

        throw new AppError('Failed to queue audio generation job', 500);
    }

    res.status(202).json({
        success: true,
        message: 'Audio generation started',
        data: {
            jobId,
            status: 'queued',
            estimatedTime: '3-5 minutes'
        }
    });
});

/**
 * @route   GET /api/audio/job/:jobId/status
 * @desc    Check audio generation status
 * @access  Private
 */
const getAudioGenerationStatus = asyncHandler(async (req, res) => {
    const { jobId } = req.params;
    const userId = req.userId;

    // Get job from database
    const { data: job, error } = await supabase
        .from('audio_generation_jobs')
        .select('*')
        .eq('id', jobId)
        .single();

    if (error || !job) {
        throw new AppError('Job not found', 404);
    }

    // Verify user owns this job
    if (job.user_id !== userId) {
        throw new AppError('Unauthorized access to this job', 403);
    }

    // If completed, also return audio details
    let audioData = null;
    if (job.status === 'completed' && job.audio_id) {
        const { data: audio } = await supabase
            .from('audio_overviews')
            .select('*')
            .eq('id', job.audio_id)
            .single();

        if (audio) {
            audioData = audio;
        }
    }

    res.status(200).json({
        success: true,
        data: {
            jobId: job.id,
            status: job.status,
            progress: job.progress,
            sourceUrl: job.source_url,
            error: job.error,
            result: job.result,
            audio: audioData,
            createdAt: job.created_at,
            completedAt: job.completed_at
        }
    });
});

/**
 * @route   DELETE /api/audio/job/:jobId
 * @desc    Cancel audio generation
 * @access  Private
 */
const cancelAudioGeneration = asyncHandler(async (req, res) => {
    const { jobId } = req.params;
    const userId = req.userId;

    // Get job from database
    const { data: job, error } = await supabase
        .from('audio_generation_jobs')
        .select('*')
        .eq('id', jobId)
        .single();

    if (error || !job) {
        throw new AppError('Job not found', 404);
    }

    // Verify user owns this job
    if (job.user_id !== userId) {
        throw new AppError('Unauthorized access to this job', 403);
    }

    // Can only cancel if still processing
    if (!['queued', 'processing'].includes(job.status)) {
        throw new AppError('Can only cancel jobs that are still processing', 400);
    }

    try {
        // Remove from Bull queue
        const bullJob = await audioGenerationQueue.getJob(jobId);
        if (bullJob) {
            await bullJob.remove();
        }

        // Update database
        await supabase
            .from('audio_generation_jobs')
            .update({
                status: 'cancelled',
                error: 'Cancelled by user'
            })
            .eq('id', jobId);

        console.log(`✓ Audio job ${jobId} cancelled by user ${userId}`);

        res.status(200).json({
            success: true,
            message: 'Audio generation cancelled successfully'
        });
    } catch (error) {
        console.error('Failed to cancel job:', error);
        throw new AppError('Failed to cancel generation', 500);
    }
});

/**
 * @route   GET /api/audio/my-audio
 * @desc    Get user's generated audio overviews
 * @access  Private
 */
const getMyAudioOverviews = asyncHandler(async (req, res) => {
    const userId = req.userId;

    const { data: audioList, error } = await supabase
        .from('audio_overviews')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(20);

    if (error) {
        throw new AppError('Failed to fetch audio overviews', 500);
    }

    res.status(200).json({
        success: true,
        data: {
            audios: audioList || [],
            count: audioList?.length || 0
        }
    });
});

/**
 * @route   GET /api/audio/:audioId
 * @desc    Get single audio overview details
 * @access  Private
 */
const getAudioOverview = asyncHandler(async (req, res) => {
    const { audioId } = req.params;
    const userId = req.userId;

    const { data: audio, error } = await supabase
        .from('audio_overviews')
        .select('*')
        .eq('id', audioId)
        .single();

    if (error || !audio) {
        throw new AppError('Audio overview not found', 404);
    }

    // Verify user owns this audio
    if (audio.user_id !== userId) {
        throw new AppError('Unauthorized access to this audio', 403);
    }

    res.status(200).json({
        success: true,
        data: audio
    });
});

/**
 * @route   DELETE /api/audio/:audioId
 * @desc    Delete audio overview
 * @access  Private
 */
const deleteAudioOverview = asyncHandler(async (req, res) => {
    const { audioId } = req.params;
    const userId = req.userId;

    // Check ownership
    const { data: audio, error: fetchError } = await supabase
        .from('audio_overviews')
        .select('id, user_id, audio_url')
        .eq('id', audioId)
        .single();

    if (fetchError || !audio) {
        throw new AppError('Audio overview not found', 404);
    }

    if (audio.user_id !== userId) {
        throw new AppError('Unauthorized access to this audio', 403);
    }

    // Delete from database
    const { error: deleteError } = await supabase
        .from('audio_overviews')
        .delete()
        .eq('id', audioId);

    if (deleteError) {
        throw new AppError('Failed to delete audio overview', 500);
    }

    // TODO: Also delete the audio file from storage

    res.status(200).json({
        success: true,
        message: 'Audio overview deleted successfully'
    });
});

/**
 * @route   GET /api/audio/check-availability
 * @desc    Check if audio generation is available
 * @access  Public
 */
const checkAvailability = asyncHandler(async (req, res) => {
    const availability = await checkAudioGenerationAvailability();
    const voices = getAvailableVoices();

    res.status(200).json({
        success: true,
        data: {
            ...availability,
            voices
        }
    });
});

/**
 * @route   GET /api/audio/my-jobs
 * @desc    Get user's audio generation jobs
 * @access  Private
 */
const getMyAudioJobs = asyncHandler(async (req, res) => {
    const userId = req.userId;

    const { data: jobs, error } = await supabase
        .from('audio_generation_jobs')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(20);

    if (error) {
        throw new AppError('Failed to fetch audio jobs', 500);
    }

    res.status(200).json({
        success: true,
        data: {
            jobs: jobs || [],
            count: jobs?.length || 0
        }
    });
});

module.exports = {
    startAudioGeneration,
    getAudioGenerationStatus,
    cancelAudioGeneration,
    getMyAudioOverviews,
    getAudioOverview,
    deleteAudioOverview,
    checkAvailability,
    getMyAudioJobs
};
