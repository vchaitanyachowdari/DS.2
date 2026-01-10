const express = require('express');
const { body } = require('express-validator');
const { authenticate } = require('../middleware/auth');
const {
  startVideoGeneration,
  getGenerationStatus,
  cancelGeneration,
  getMyGenerationJobs
} = require('../controllers/generate.controller');

const router = express.Router();

/**
 * @route   POST /api/generate/video
 * @desc    Start video generation from URL
 * @access  Private
 */
router.post(
  '/video',
  authenticate,
  [
    body('url')
      .trim()
      .notEmpty()
      .withMessage('URL is required')
      .isURL()
      .withMessage('Invalid URL format')
  ],
  startVideoGeneration
);

/**
 * @route   GET /api/generate/video/:jobId/status
 * @desc    Check video generation status
 * @access  Private
 */
router.get('/video/:jobId/status', authenticate, getGenerationStatus);

/**
 * @route   DELETE /api/generate/video/:jobId
 * @desc    Cancel video generation
 * @access  Private
 */
router.delete('/video/:jobId', authenticate, cancelGeneration);

/**
 * @route   GET /api/generate/my-jobs
 * @desc    Get user's generation jobs
 * @access  Private
 */
router.get('/my-jobs', authenticate, getMyGenerationJobs);

module.exports = router;
