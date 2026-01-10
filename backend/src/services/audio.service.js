/**
 * Audio Overview Service
 * Orchestrates the full Audio Overview generation pipeline
 * Similar to NotebookLM's podcast-style audio generation
 */
const path = require('path');
const fs = require('fs').promises;
const { extractContentFromURL } = require('./ai.service');
const { generateDialogueScript, estimateDialogueDuration, formatDuration } = require('./dialogue.service');
const {
    generateDialogueAudio,
    mixAudioFiles,
    cleanupTempFiles,
    getAudioDuration,
    checkDependencies
} = require('./tts.service');

// Output directory for generated audio files
const AUDIO_OUTPUT_DIR = path.join(process.cwd(), 'public', 'audio');

/**
 * Generate a complete Audio Overview from a URL
 * @param {string} url - Source URL to generate audio from
 * @param {string} jobId - Unique job identifier
 * @param {Object} options - Generation options
 * @param {Function} onProgress - Progress callback
 * @returns {Promise<Object>} Generated audio details
 */
async function generateAudioOverview(url, jobId, options = {}, onProgress = () => { }) {
    console.log(`\n=== Starting Audio Overview Generation for ${jobId} ===`);

    // Ensure output directory exists
    await fs.mkdir(AUDIO_OUTPUT_DIR, { recursive: true });

    try {
        // Step 1: Extract content from URL
        onProgress({
            step: 'extracting',
            percentage: 5,
            message: 'Extracting content from URL...'
        });

        console.log('Step 1: Extracting content...');
        const { title, content } = await extractContentFromURL(url);
        console.log(`✓ Extracted: "${title}" (${content.length} characters)`);

        onProgress({
            step: 'extracting',
            percentage: 15,
            message: 'Content extracted successfully'
        });

        // Step 2: Generate dialogue script
        onProgress({
            step: 'generating_script',
            percentage: 20,
            message: 'Creating podcast dialogue script with AI...'
        });

        console.log('Step 2: Generating dialogue script...');
        const dialogueScript = await generateDialogueScript(content, title, options);
        console.log(`✓ Generated dialogue: ${dialogueScript.dialogue.length} turns`);

        onProgress({
            step: 'generating_script',
            percentage: 35,
            message: `Script ready: ${dialogueScript.dialogue.length} dialogue segments`
        });

        // Step 3: Generate audio for each dialogue turn
        onProgress({
            step: 'generating_audio',
            percentage: 40,
            message: 'Converting script to speech...'
        });

        console.log('Step 3: Generating audio segments...');
        const { tempDir, audioFiles } = await generateDialogueAudio(
            dialogueScript.dialogue,
            jobId,
            (progress) => {
                // Scale progress from 40% to 80%
                const scaledPercentage = 40 + Math.round(progress.percentage * 0.4);
                onProgress({
                    step: 'generating_audio',
                    percentage: scaledPercentage,
                    message: progress.message
                });
            }
        );
        console.log(`✓ Generated ${audioFiles.length} audio segments`);

        // Step 4: Mix all audio into final podcast
        onProgress({
            step: 'mixing',
            percentage: 85,
            message: 'Mixing audio into final podcast...'
        });

        console.log('Step 4: Mixing audio...');
        const outputFilename = `audio_overview_${jobId}.mp3`;
        const outputPath = path.join(AUDIO_OUTPUT_DIR, outputFilename);

        await mixAudioFiles(audioFiles, outputPath, {
            pauseBetweenSpeakers: 0.4,
            pauseSameSpeaker: 0.15,
            normalizeAudio: true
        });
        console.log(`✓ Mixed audio saved to: ${outputPath}`);

        // Get final duration
        const duration = await getAudioDuration(outputPath);
        const formattedDuration = formatDuration(duration);

        // Step 5: Cleanup temp files
        onProgress({
            step: 'finalizing',
            percentage: 95,
            message: 'Finalizing...'
        });

        console.log('Step 5: Cleaning up...');
        await cleanupTempFiles(tempDir);

        // Build result object
        const result = {
            success: true,
            audioUrl: `/audio/${outputFilename}`,
            filename: outputFilename,
            title: dialogueScript.title,
            description: dialogueScript.description,
            duration: formattedDuration,
            durationSeconds: duration,
            topics: dialogueScript.topics || [],
            keyTakeaways: dialogueScript.keyTakeaways || [],
            dialogue: dialogueScript.dialogue,
            turnCount: dialogueScript.dialogue.length,
            sourceUrl: url,
            sourceTitle: title,
            generatedAt: new Date().toISOString()
        };

        onProgress({
            step: 'completed',
            percentage: 100,
            message: 'Audio Overview generated successfully!'
        });

        console.log(`=== Audio Overview ${jobId} completed: ${formattedDuration} ===\n`);

        return result;
    } catch (error) {
        console.error(`Audio Overview generation failed for ${jobId}:`, error);
        throw error;
    }
}

/**
 * Check if audio generation is available (dependencies installed)
 * @returns {Promise<Object>} Availability status
 */
async function checkAudioGenerationAvailability() {
    const deps = await checkDependencies();

    return {
        available: deps.edgeTts && deps.ffmpeg,
        missing: [
            !deps.edgeTts && 'edge-tts (pip install edge-tts)',
            !deps.ffmpeg && 'ffmpeg'
        ].filter(Boolean),
        dependencies: deps
    };
}

/**
 * Get list of available voices
 * @returns {Object} Available voice options
 */
function getAvailableVoices() {
    return {
        hosts: {
            Alex: {
                description: 'Enthusiastic, curious host who asks great questions',
                voice: 'en-US-GuyNeural',
                alternatives: ['en-US-ChristopherNeural', 'en-GB-RyanNeural']
            },
            Sam: {
                description: 'Knowledgeable host who explains concepts clearly',
                voice: 'en-US-JennyNeural',
                alternatives: ['en-US-AriaNeural', 'en-GB-SoniaNeural']
            }
        },
        note: 'Voices are from Microsoft Edge TTS (free, high-quality)'
    };
}

module.exports = {
    generateAudioOverview,
    checkAudioGenerationAvailability,
    getAvailableVoices
};
