const { supabase } = require('../config/database');
const fs = require('fs').promises;
const path = require('path');

// Supabase Storage bucket names
const VIDEO_BUCKET = 'videos';
const AUDIO_BUCKET = 'audio';
const THUMBNAIL_BUCKET = 'thumbnails';

/**
 * Upload a file to Supabase Storage
 * @param {string} filePath - Local path to the file
 * @param {string} bucket - Storage bucket name
 * @param {string} fileName - Name for the uploaded file
 * @returns {Promise<string>} Public URL of the uploaded file
 */
async function uploadToStorage(filePath, bucket, fileName) {
    try {
        // Read the file
        const fileBuffer = await fs.readFile(filePath);

        // Determine content type
        const ext = path.extname(fileName).toLowerCase();
        const contentTypes = {
            '.mp4': 'video/mp4',
            '.webm': 'video/webm',
            '.mp3': 'audio/mpeg',
            '.wav': 'audio/wav',
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.png': 'image/png',
            '.webp': 'image/webp'
        };
        const contentType = contentTypes[ext] || 'application/octet-stream';

        console.log(`Uploading ${fileName} to ${bucket} bucket...`);

        // Upload to Supabase Storage
        const { data, error } = await supabase.storage
            .from(bucket)
            .upload(fileName, fileBuffer, {
                contentType,
                upsert: true // Overwrite if exists
            });

        if (error) {
            throw new Error(`Upload failed: ${error.message}`);
        }

        // Get public URL
        const { data: urlData } = supabase.storage
            .from(bucket)
            .getPublicUrl(fileName);

        console.log(`✓ Uploaded to: ${urlData.publicUrl}`);
        return urlData.publicUrl;
    } catch (error) {
        console.error('Storage upload error:', error);
        throw error;
    }
}

/**
 * Upload a video file to Supabase Storage
 * @param {string} filePath - Local path to video file
 * @param {string} jobId - Job ID for unique naming
 * @returns {Promise<string>} Public URL of the video
 */
async function uploadVideo(filePath, jobId) {
    const fileName = `${jobId}/${path.basename(filePath)}`;
    return uploadToStorage(filePath, VIDEO_BUCKET, fileName);
}

/**
 * Upload an audio file to Supabase Storage
 * @param {string} filePath - Local path to audio file
 * @param {string} jobId - Job ID for unique naming
 * @returns {Promise<string>} Public URL of the audio
 */
async function uploadAudio(filePath, jobId) {
    const fileName = `${jobId}/${path.basename(filePath)}`;
    return uploadToStorage(filePath, AUDIO_BUCKET, fileName);
}

/**
 * Upload a thumbnail image to Supabase Storage
 * @param {string} filePath - Local path to thumbnail
 * @param {string} jobId - Job ID for unique naming
 * @returns {Promise<string>} Public URL of the thumbnail
 */
async function uploadThumbnail(filePath, jobId) {
    const ext = path.extname(filePath);
    const fileName = `${jobId}/thumbnail${ext}`;
    return uploadToStorage(filePath, THUMBNAIL_BUCKET, fileName);
}

/**
 * Delete a file from Supabase Storage
 * @param {string} bucket - Storage bucket name
 * @param {string} fileName - Name of the file to delete
 */
async function deleteFromStorage(bucket, fileName) {
    try {
        const { error } = await supabase.storage
            .from(bucket)
            .remove([fileName]);

        if (error) {
            console.error('Delete failed:', error.message);
        }
    } catch (error) {
        console.error('Storage delete error:', error);
    }
}

/**
 * Delete all files for a job from storage
 * @param {string} jobId - Job ID
 */
async function deleteJobFiles(jobId) {
    try {
        // Delete from all buckets
        for (const bucket of [VIDEO_BUCKET, AUDIO_BUCKET, THUMBNAIL_BUCKET]) {
            const { data: files } = await supabase.storage
                .from(bucket)
                .list(jobId);

            if (files && files.length > 0) {
                const filePaths = files.map(f => `${jobId}/${f.name}`);
                await supabase.storage.from(bucket).remove(filePaths);
            }
        }
        console.log(`✓ Deleted all files for job ${jobId}`);
    } catch (error) {
        console.error('Failed to delete job files:', error);
    }
}

/**
 * Check if Supabase Storage buckets exist
 * @returns {Promise<{available: boolean, buckets: string[]}>}
 */
async function checkStorageBuckets() {
    try {
        const { data: buckets, error } = await supabase.storage.listBuckets();

        if (error) {
            return { available: false, error: error.message };
        }

        const bucketNames = buckets.map(b => b.name);
        const requiredBuckets = [VIDEO_BUCKET, AUDIO_BUCKET, THUMBNAIL_BUCKET];
        const missingBuckets = requiredBuckets.filter(b => !bucketNames.includes(b));

        return {
            available: missingBuckets.length === 0,
            existingBuckets: bucketNames,
            missingBuckets
        };
    } catch (error) {
        return { available: false, error: error.message };
    }
}

module.exports = {
    uploadToStorage,
    uploadVideo,
    uploadAudio,
    uploadThumbnail,
    deleteFromStorage,
    deleteJobFiles,
    checkStorageBuckets,
    VIDEO_BUCKET,
    AUDIO_BUCKET,
    THUMBNAIL_BUCKET
};
