const Redis = require('ioredis');
require('dotenv').config();

// Redis connection configuration
// If REDIS_URL is set (e.g., Upstash), use it. Otherwise use host/port
let redis;

if (process.env.REDIS_URL) {
  // Parse the URL to check if it's from Upstash (needs TLS)
  const isUpstash = process.env.REDIS_URL.includes('upstash.io');

  redis = new Redis(process.env.REDIS_URL, {
    maxRetriesPerRequest: 3,
    enableReadyCheck: false,
    tls: isUpstash ? { rejectUnauthorized: false } : undefined,
    family: 4, // Use IPv4
    retryStrategy(times) {
      const delay = Math.min(times * 50, 2000);
      return delay;
    }
  });
} else {
  // Local Redis
  redis = new Redis({
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379'),
    maxRetriesPerRequest: 3,
    enableReadyCheck: false,
    retryStrategy(times) {
      const delay = Math.min(times * 50, 2000);
      return delay;
    }
  });
}

// Event handlers
redis.on('connect', () => {
  console.log('✓ Redis connected successfully');
});

redis.on('error', (err) => {
  console.error('✗ Redis connection error:', err.message);
  console.log('⚠ Video generation will be disabled without Redis');
});

redis.on('ready', () => {
  console.log('✓ Redis is ready to accept commands');
});

redis.on('close', () => {
  console.log('⚠ Redis connection closed');
});

module.exports = redis;
