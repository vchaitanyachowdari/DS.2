const { supabase } = require('../config/database');
const { AppError, asyncHandler } = require('../middleware/errorHandler');
const { videoGenerationQueue } = require('../jobs/queue');
const { nanoid } = require('nanoid');
const { validationResult } = require('express-validator');

/**
 * @route   POST /api/generate/video
 * @desc    Start video generation from URL
 * @access  Private
 */
const startVideoGeneration = asyncHandler(async (req, res) => {
  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new AppError('Invalid input: ' + errors.array()[0].msg, 400);
  }

  const { url } = req.body;
  const userId = req.userId;

  // Validate URL format
  try {
    new URL(url);
  } catch (error) {
    throw new AppError('Invalid URL format', 400);
  }

  // Check daily limit (50 videos per day for testing)
  const today = new Date().toISOString().split('T')[0];
  const { data: limits } = await supabase
    .from('daily_limits')
    .select('videos_generated')
    .eq('user_id', userId)
    .eq('date', today)
    .single();

  const maxLimit = process.env.NODE_ENV === 'development' ? 50 : 5;
  if (limits && limits.videos_generated >= maxLimit) {
    throw new AppError(`Daily video generation limit reached (${maxLimit}/day). Try again tomorrow!`, 429);
  }

  // Generate unique job ID
  const jobId = `video_${nanoid(12)}`;

  // Create job entry in database
  const { error: jobError } = await supabase
    .from('video_generation_jobs')
    .insert([
      {
        id: jobId,
        user_id: userId,
        source_url: url,
        status: 'processing',
        progress: {
          step: 0,
          totalSteps: 3,
          percentage: 0,
          message: 'Starting video generation...'
        }
      }
    ]);

  if (jobError) {
    console.error('Failed to create job:', jobError);
    throw new AppError('Failed to start video generation', 500);
  }

  // Add job to Bull queue
  try {
    await videoGenerationQueue.add(
      {
        jobId,
        userId,
        sourceUrl: url
      },
      {
        jobId, // Use our custom ID
        timeout: 300000, // 5 minutes timeout
        removeOnComplete: true,
        removeOnFail: false
      }
    );

    console.log(`✓ Video generation job ${jobId} queued for user ${userId}`);
  } catch (error) {
    // If queue fails, update job status
    await supabase
      .from('video_generation_jobs')
      .update({
        status: 'failed',
        error: 'Failed to queue job: ' + error.message
      })
      .eq('id', jobId);

    throw new AppError('Failed to queue video generation job', 500);
  }

  res.status(202).json({
    success: true,
    message: 'Video generation started',
    data: {
      jobId,
      status: 'processing',
      estimatedTime: '3-5 minutes'
    }
  });
});

/**
 * @route   GET /api/generate/video/:jobId/status
 * @desc    Check video generation status
 * @access  Private
 */
const getGenerationStatus = asyncHandler(async (req, res) => {
  const { jobId } = req.params;
  const userId = req.userId;

  // Get job from database
  const { data: job, error } = await supabase
    .from('video_generation_jobs')
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

  // If completed, also return video details
  let videoData = null;
  if (job.status === 'completed' && job.video_id) {
    const { data: video } = await supabase
      .from('videos')
      .select('*')
      .eq('id', job.video_id)
      .single();

    if (video) {
      videoData = {
        ...video,
        isBookmarked: false // TODO: Check if user bookmarked
      };
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
      video: videoData,
      createdAt: job.created_at,
      completedAt: job.completed_at
    }
  });
});

/**
 * @route   DELETE /api/generate/video/:jobId
 * @desc    Cancel video generation
 * @access  Private
 */
const cancelGeneration = asyncHandler(async (req, res) => {
  const { jobId } = req.params;
  const userId = req.userId;

  // Get job from database
  const { data: job, error } = await supabase
    .from('video_generation_jobs')
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
  if (job.status !== 'processing') {
    throw new AppError('Can only cancel jobs that are still processing', 400);
  }

  try {
    // Remove from Bull queue
    const bullJob = await videoGenerationQueue.getJob(jobId);
    if (bullJob) {
      await bullJob.remove();
    }

    // Update database
    await supabase
      .from('video_generation_jobs')
      .update({
        status: 'cancelled',
        error: 'Cancelled by user'
      })
      .eq('id', jobId);

    console.log(`✓ Job ${jobId} cancelled by user ${userId}`);

    res.status(200).json({
      success: true,
      message: 'Video generation cancelled successfully'
    });
  } catch (error) {
    console.error('Failed to cancel job:', error);
    throw new AppError('Failed to cancel generation', 500);
  }
});

/**
 * @route   GET /api/generate/my-jobs
 * @desc    Get user's generation jobs
 * @access  Private
 */
const getMyGenerationJobs = asyncHandler(async (req, res) => {
  const userId = req.userId;

  const { data: jobs, error } = await supabase
    .from('video_generation_jobs')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(20);

  if (error) {
    throw new AppError('Failed to fetch generation jobs', 500);
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
  startVideoGeneration,
  getGenerationStatus,
  cancelGeneration,
  getMyGenerationJobs
};
