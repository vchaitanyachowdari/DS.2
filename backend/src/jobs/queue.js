const Queue = require('bull');

// Create video generation queue
// For Upstash or other Redis URLs with TLS
let queueOptions;

if (process.env.REDIS_URL) {
  const isUpstash = process.env.REDIS_URL.includes('upstash.io');

  queueOptions = {
    redis: process.env.REDIS_URL,
    createClient: (type, config) => {
      const Redis = require('ioredis');
      const url = process.env.REDIS_URL;

      return new Redis(url, {
        maxRetriesPerRequest: null, // Important for Bull
        enableReadyCheck: false,
        tls: isUpstash ? { rejectUnauthorized: false } : undefined,
        family: 4
      });
    }
  };
} else {
  queueOptions = {
    redis: {
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379'),
      maxRetriesPerRequest: null
    }
  };
}

const videoGenerationQueue = new Queue('video-generation', {
  ...queueOptions,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 5000
    },
    removeOnComplete: 100, // Keep last 100 completed jobs
    removeOnFail: 200 // Keep last 200 failed jobs
  }
});

// Audio generation queue for NotebookLM-style podcasts
const audioGenerationQueue = new Queue('audio-generation', {
  ...queueOptions,
  defaultJobOptions: {
    attempts: 2, // Fewer retries for audio (takes longer)
    backoff: {
      type: 'exponential',
      delay: 10000
    },
    removeOnComplete: 100,
    removeOnFail: 200
  }
});

// Event listeners for video queue
videoGenerationQueue.on('error', (error) => {
  console.error('❌ Video Queue error:', error.message);
});

videoGenerationQueue.on('waiting', (jobId) => {
  console.log(`⏳ Video Job ${jobId} is waiting`);
});

videoGenerationQueue.on('active', (job) => {
  console.log(`▶️  Video Job ${job.id} is now active`);
});

videoGenerationQueue.on('completed', (job, result) => {
  console.log(`✅ Video Job ${job.id} completed`);
});

videoGenerationQueue.on('failed', (job, err) => {
  console.error(`❌ Video Job ${job.id} failed:`, err.message);
});

// Event listeners for audio queue
audioGenerationQueue.on('error', (error) => {
  console.error('❌ Audio Queue error:', error.message);
});

audioGenerationQueue.on('waiting', (jobId) => {
  console.log(`🎧 Audio Job ${jobId} is waiting`);
});

audioGenerationQueue.on('active', (job) => {
  console.log(`🎙️  Audio Job ${job.id} is now active`);
});

audioGenerationQueue.on('completed', (job, result) => {
  console.log(`🎵 Audio Job ${job.id} completed`);
});

audioGenerationQueue.on('failed', (job, err) => {
  console.error(`❌ Audio Job ${job.id} failed:`, err.message);
});

module.exports = {
  videoGenerationQueue,
  audioGenerationQueue
};
