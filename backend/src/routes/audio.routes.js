/**
 * Audio Generation Routes
 * API routes for NotebookLM-style Audio Overview generation
 */
const express = require('express');
const { body } = require('express-validator');
const { authenticate } = require('../middleware/auth');
const {
    startAudioGeneration,
    getAudioGenerationStatus,
    cancelAudioGeneration,
    getMyAudioOverviews,
    getAudioOverview,
    deleteAudioOverview,
    checkAvailability,
    getMyAudioJobs
} = require('../controllers/audio.controller');

const router = express.Router();

/**
 * @route   GET /api/audio/check-availability
 * @desc    Check if audio generation is available (dependencies installed)
 * @access  Public
 */
router.get('/check-availability', checkAvailability);

/**
 * @route   POST /api/audio/generate
 * @desc    Start audio overview generation from URL
 * @access  Private
 */
router.post(
    '/generate',
    authenticate,
    [
        body('url')
            .trim()
            .notEmpty()
            .withMessage('URL is required')
            .isURL()
            .withMessage('Invalid URL format'),
        body('options.targetAudience')
            .optional()
            .isString()
            .withMessage('Target audience must be a string'),
        body('options.focusArea')
            .optional()
            .isString()
            .withMessage('Focus area must be a string'),
        body('options.duration')
            .optional()
            .isString()
            .withMessage('Duration must be a string'),
        body('options.tone')
            .optional()
            .isString()
            .withMessage('Tone must be a string')
    ],
    startAudioGeneration
);

/**
 * @route   GET /api/audio/job/:jobId/status
 * @desc    Check audio generation status
 * @access  Private
 */
router.get('/job/:jobId/status', authenticate, getAudioGenerationStatus);

/**
 * @route   DELETE /api/audio/job/:jobId
 * @desc    Cancel audio generation
 * @access  Private
 */
router.delete('/job/:jobId', authenticate, cancelAudioGeneration);

/**
 * @route   GET /api/audio/my-jobs
 * @desc    Get user's audio generation jobs
 * @access  Private
 */
router.get('/my-jobs', authenticate, getMyAudioJobs);

/**
 * @route   GET /api/audio/my-audio
 * @desc    Get user's generated audio overviews
 * @access  Private
 */
router.get('/my-audio', authenticate, getMyAudioOverviews);

/**
 * @route   GET /api/audio/:audioId
 * @desc    Get single audio overview details
 * @access  Private
 */
router.get('/:audioId', authenticate, getAudioOverview);

/**
 * @route   DELETE /api/audio/:audioId
 * @desc    Delete audio overview
 * @access  Private
 */
router.delete('/:audioId', authenticate, deleteAudioOverview);

module.exports = router;
