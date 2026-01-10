/**
 * Text-to-Speech Service
 * Generates high-quality audio from dialogue scripts using Edge TTS
 * Edge TTS is free and provides natural-sounding Microsoft voices
 */
const { exec, spawn } = require('child_process');
const fs = require('fs').promises;
const path = require('path');
const { promisify } = require('util');
const execPromise = promisify(exec);

// Voice configurations for our hosts
const VOICE_CONFIG = {
    Alex: {
        // Enthusiastic, curious host - using a friendly male voice
        voice: 'en-US-GuyNeural',
        rate: '+5%',
        pitch: '+2Hz'
    },
    Sam: {
        // Knowledgeable, clear host - using a warm female voice
        voice: 'en-US-JennyNeural',
        rate: '+0%',
        pitch: '+0Hz'
    }
};

// Alternative voices for variety
const ALTERNATIVE_VOICES = {
    Alex: ['en-US-ChristopherNeural', 'en-US-EricNeural', 'en-GB-RyanNeural'],
    Sam: ['en-US-AriaNeural', 'en-US-SaraNeural', 'en-GB-SoniaNeural']
};

/**
 * Generate audio for a single dialogue turn using Edge TTS
 * @param {string} text - Text to convert to speech
 * @param {string} speaker - Speaker name (Alex or Sam)
 * @param {string} outputPath - Output file path
 * @param {string} emotion - Emotion hint (not all voices support this)
 * @returns {Promise<string>} Path to generated audio file
 */
async function generateTurnAudio(text, speaker, outputPath, emotion = 'neutral') {
    const config = VOICE_CONFIG[speaker] || VOICE_CONFIG.Alex;

    // Escape text for command line
    const escapedText = text
        .replace(/"/g, '\\"')
        .replace(/'/g, "\\'")
        .replace(/`/g, '\\`')
        .replace(/\$/g, '\\$');

    // Build edge-tts command (use python -m for cross-platform compatibility)
    const command = `python -m edge_tts --voice "${config.voice}" --rate="${config.rate}" --pitch="${config.pitch}" --text "${escapedText}" --write-media "${outputPath}"`;

    try {
        await execPromise(command, { timeout: 30000 });
        return outputPath;
    } catch (error) {
        console.error(`TTS error for ${speaker}:`, error.message);
        throw new Error(`Failed to generate audio for ${speaker}: ${error.message}`);
    }
}

/**
 * Generate audio for entire dialogue script
 * @param {Array} dialogue - Array of dialogue turns
 * @param {string} jobId - Unique job identifier for file naming
 * @param {Function} onProgress - Progress callback
 * @returns {Promise<Object>} Paths to generated audio files
 */
async function generateDialogueAudio(dialogue, jobId, onProgress = () => { }) {
    const tempDir = path.join(process.cwd(), 'temp', jobId);

    // Create temp directory
    await fs.mkdir(tempDir, { recursive: true });

    const audioFiles = [];
    const totalTurns = dialogue.length;

    for (let i = 0; i < dialogue.length; i++) {
        const turn = dialogue[i];
        const outputPath = path.join(tempDir, `turn_${i.toString().padStart(3, '0')}_${turn.speaker}.mp3`);

        await generateTurnAudio(turn.text, turn.speaker, outputPath, turn.emotion);

        audioFiles.push({
            index: i,
            speaker: turn.speaker,
            path: outputPath,
            text: turn.text
        });

        // Report progress
        const progress = Math.round(((i + 1) / totalTurns) * 100);
        onProgress({
            step: 'generating_audio',
            current: i + 1,
            total: totalTurns,
            percentage: progress,
            message: `Generating audio: ${progress}% (${i + 1}/${totalTurns} segments)`
        });
    }

    return {
        tempDir,
        audioFiles
    };
}

/**
 * Mix multiple audio files into a single podcast
 * Uses ffmpeg for professional audio mixing
 * @param {Array} audioFiles - Array of audio file info
 * @param {string} outputPath - Final output file path
 * @param {Object} options - Mixing options
 * @returns {Promise<string>} Path to final mixed audio
 */
async function mixAudioFiles(audioFiles, outputPath, options = {}) {
    const {
        pauseBetweenSpeakers = 0.3, // seconds of silence between different speakers
        pauseSameSpeaker = 0.1,     // seconds of silence for same speaker continuing
        normalizeAudio = true
    } = options;

    // Create a file list for ffmpeg concat
    const tempDir = path.dirname(audioFiles[0].path);
    const listPath = path.join(tempDir, 'filelist.txt');
    const silencePath = path.join(tempDir, 'silence.mp3');

    // Generate silence file
    await execPromise(`ffmpeg -y -f lavfi -i anullsrc=r=24000:cl=mono -t ${pauseBetweenSpeakers} -q:a 9 "${silencePath}"`);

    // Build file list with pauses
    let fileListContent = '';
    let lastSpeaker = null;

    for (const file of audioFiles) {
        // Add pause if speaker changed
        if (lastSpeaker !== null && lastSpeaker !== file.speaker) {
            fileListContent += `file '${silencePath.replace(/\\/g, '/')}'\n`;
        }
        fileListContent += `file '${file.path.replace(/\\/g, '/')}'\n`;
        lastSpeaker = file.speaker;
    }

    await fs.writeFile(listPath, fileListContent);

    // Concatenate all audio files
    const concatCommand = `ffmpeg -y -f concat -safe 0 -i "${listPath}" -c:a libmp3lame -q:a 2 "${outputPath}"`;

    try {
        await execPromise(concatCommand, { timeout: 120000 });

        // Optionally normalize audio levels
        if (normalizeAudio) {
            const normalizedPath = outputPath.replace('.mp3', '_normalized.mp3');
            await execPromise(`ffmpeg -y -i "${outputPath}" -af "loudnorm=I=-16:TP=-1.5:LRA=11" "${normalizedPath}"`);

            // Replace original with normalized
            await fs.rename(normalizedPath, outputPath);
        }

        return outputPath;
    } catch (error) {
        console.error('Audio mixing error:', error.message);
        throw new Error(`Failed to mix audio: ${error.message}`);
    }
}

/**
 * Clean up temporary files after processing
 * @param {string} tempDir - Temporary directory to clean
 */
async function cleanupTempFiles(tempDir) {
    try {
        await fs.rm(tempDir, { recursive: true, force: true });
        console.log(`Cleaned up temp directory: ${tempDir}`);
    } catch (error) {
        console.error('Cleanup error:', error.message);
    }
}

/**
 * Get audio file duration using ffprobe
 * @param {string} filePath - Path to audio file
 * @returns {Promise<number>} Duration in seconds
 */
async function getAudioDuration(filePath) {
    try {
        const { stdout } = await execPromise(
            `ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${filePath}"`
        );
        return parseFloat(stdout.trim());
    } catch (error) {
        console.error('Duration check error:', error.message);
        return 0;
    }
}

/**
 * Check if required tools are installed
 * @returns {Promise<Object>} Status of required tools
 */
async function checkDependencies() {
    const deps = {
        edgeTts: false,
        ffmpeg: false
    };

    try {
        await execPromise('python -m edge_tts --version');
        deps.edgeTts = true;
    } catch {
        console.warn('edge-tts not found. Install with: pip install edge-tts');
    }

    try {
        await execPromise('ffmpeg -version');
        deps.ffmpeg = true;
    } catch {
        console.warn('ffmpeg not found. Please install ffmpeg.');
    }

    return deps;
}

module.exports = {
    generateTurnAudio,
    generateDialogueAudio,
    mixAudioFiles,
    cleanupTempFiles,
    getAudioDuration,
    checkDependencies,
    VOICE_CONFIG,
    ALTERNATIVE_VOICES
};
