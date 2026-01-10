/**
 * Background worker process for video and audio generation jobs
 * Run this separately: node src/worker.js
 */
require('dotenv').config();
const { videoGenerationQueue, audioGenerationQueue } = require('./jobs/queue');
const { processVideoGeneration } = require('./jobs/videoGeneration.job');
const { processAudioGeneration } = require('./jobs/audioGeneration.job');

console.log('🚀 Media Generation Worker starting...');
console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
console.log(`Redis: ${process.env.REDIS_HOST || 'localhost'}:${process.env.REDIS_PORT || '6379'}`);

// Process video generation jobs
videoGenerationQueue.process(async (job) => {
  console.log(`\n📹 Processing video job ${job.id}...`);
  const result = await processVideoGeneration(job);
  return result;
});

// Process audio generation jobs (NotebookLM-style podcasts)
audioGenerationQueue.process(async (job) => {
  console.log(`\n🎙️ Processing audio job ${job.id}...`);
  const result = await processAudioGeneration(job);
  return result;
});

// Video queue error handlers
videoGenerationQueue.on('error', (error) => {
  console.error('❌ Video Queue error:', error);
});

videoGenerationQueue.on('failed', (job, err) => {
  console.error(`❌ Video Job ${job.id} failed:`, err.message);
});

videoGenerationQueue.on('completed', (job, result) => {
  console.log(`✅ Video Job ${job.id} completed successfully`);
});

// Audio queue error handlers
audioGenerationQueue.on('error', (error) => {
  console.error('❌ Audio Queue error:', error);
});

audioGenerationQueue.on('failed', (job, err) => {
  console.error(`❌ Audio Job ${job.id} failed:`, err.message);
});

audioGenerationQueue.on('completed', (job, result) => {
  console.log(`🎵 Audio Job ${job.id} completed successfully`);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('\n🛑 Worker shutting down...');
  await videoGenerationQueue.close();
  await audioGenerationQueue.close();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('\n🛑 Worker shutting down...');
  await videoGenerationQueue.close();
  await audioGenerationQueue.close();
  process.exit(0);
});

console.log('✅ Worker ready - processing video and audio jobs...\n');

