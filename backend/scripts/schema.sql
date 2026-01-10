-- ============================================================================
-- Student Learning Platform - Database Schema
-- ============================================================================
-- This script creates all necessary tables, indexes, and triggers for the
-- Student Learning Platform backend API.
--
-- Instructions:
-- 1. Go to your Supabase dashboard (https://supabase.com/dashboard)
-- 2. Select your project
-- 3. Go to SQL Editor
-- 4. Copy and paste this entire file
-- 5. Click "Run" to execute
--
-- Note: This script is idempotent - it can be run multiple times safely
-- ============================================================================

-- Enable UUID extension for generating unique IDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- USERS TABLE
-- ============================================================================
-- Stores user account information
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  avatar VARCHAR(10), -- User initials like "JD" or "AS"
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Add comment
COMMENT ON TABLE users IS 'Stores user account information';
COMMENT ON COLUMN users.avatar IS 'User initials for avatar display';

-- ============================================================================
-- USER STATS TABLE
-- ============================================================================
-- Tracks user activity statistics (separate table for easy updates)
CREATE TABLE IF NOT EXISTS user_stats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  videos_generated INT DEFAULT 0,
  reviews_completed INT DEFAULT 0,
  videos_watched INT DEFAULT 0,
  bookmarks_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id)
);

COMMENT ON TABLE user_stats IS 'Tracks user activity and engagement metrics';

-- ============================================================================
-- VIDEOS TABLE
-- ============================================================================
-- Stores video content (both curated and AI-generated)
CREATE TABLE IF NOT EXISTS videos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(500) NOT NULL,
  description TEXT,
  thumbnail VARCHAR(500), -- URL to thumbnail image
  video_url VARCHAR(500) NOT NULL, -- URL to video file
  duration VARCHAR(20), -- Format: "7:32" or "12:45"
  category VARCHAR(50) NOT NULL, -- AI/ML, Data Science, Research
  views INT DEFAULT 0,
  published_at TIMESTAMP DEFAULT NOW(),
  source VARCHAR(100), -- arXiv, Papers with Code, YouTube, etc.
  source_url VARCHAR(500), -- Original content URL
  transcript TEXT, -- Video transcript/captions
  created_by UUID REFERENCES users(id) ON DELETE SET NULL, -- NULL for curated videos
  is_generated BOOLEAN DEFAULT FALSE, -- TRUE if AI-generated
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),

  -- Constraints
  CHECK (category IN ('AI/ML', 'Data Science', 'Research', 'All'))
);

COMMENT ON TABLE videos IS 'Stores all video content including curated and AI-generated videos';
COMMENT ON COLUMN videos.created_by IS 'User who generated the video (NULL for curated videos)';
COMMENT ON COLUMN videos.is_generated IS 'Indicates if video was AI-generated vs curated';

-- ============================================================================
-- BOOKMARKS TABLE
-- ============================================================================
-- Tracks which videos users have bookmarked
CREATE TABLE IF NOT EXISTS bookmarks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  video_id UUID REFERENCES videos(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),

  -- Unique constraint: user can only bookmark a video once
  UNIQUE(user_id, video_id)
);

COMMENT ON TABLE bookmarks IS 'Tracks user bookmarks for videos';

-- ============================================================================
-- VIDEO GENERATION JOBS TABLE
-- ============================================================================
-- Tracks background jobs for AI video generation
CREATE TABLE IF NOT EXISTS video_generation_jobs (
  id VARCHAR(100) PRIMARY KEY, -- Custom job ID like "job_abc123"
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  source_url VARCHAR(500) NOT NULL, -- URL to article/paper
  status VARCHAR(20) DEFAULT 'processing', -- processing, completed, failed, cancelled
  progress JSONB DEFAULT '{"step": 1, "totalSteps": 3, "percentage": 0}',
  video_id UUID REFERENCES videos(id) ON DELETE SET NULL, -- Link to created video
  error TEXT, -- Error message if failed
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP,

  -- Constraints
  CHECK (status IN ('processing', 'completed', 'failed', 'cancelled'))
);

COMMENT ON TABLE video_generation_jobs IS 'Tracks background jobs for AI-powered video generation';
COMMENT ON COLUMN video_generation_jobs.progress IS 'JSON object with step, totalSteps, and percentage';

-- ============================================================================
-- CODE REVIEWS TABLE
-- ============================================================================
-- Stores AI-powered code review results
CREATE TABLE IF NOT EXISTS code_reviews (
  id VARCHAR(100) PRIMARY KEY, -- Custom review ID like "review_xyz789"
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  repo_url VARCHAR(500) NOT NULL, -- GitHub repository URL
  repo_name VARCHAR(200), -- Repository name like "username/repo"
  status VARCHAR(20) DEFAULT 'processing', -- processing, completed, failed
  quality_score DECIMAL(3,1), -- Quality score 0.0 - 10.0
  strengths TEXT[], -- Array of strength points
  improvements TEXT[], -- Array of improvement suggestions
  key_suggestions TEXT[], -- Array of key actionable suggestions
  full_review TEXT, -- Full detailed review text
  metrics JSONB, -- Additional metrics like test coverage, complexity, etc.
  pdf_url VARCHAR(500), -- URL to generated PDF report
  error TEXT, -- Error message if failed
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP,

  -- Constraints
  CHECK (status IN ('processing', 'completed', 'failed')),
  CHECK (quality_score IS NULL OR (quality_score >= 0 AND quality_score <= 10))
);

COMMENT ON TABLE code_reviews IS 'Stores AI-powered code review results for GitHub repositories';
COMMENT ON COLUMN code_reviews.strengths IS 'Array of identified code strengths';
COMMENT ON COLUMN code_reviews.improvements IS 'Array of suggested improvements';

-- ============================================================================
-- DAILY LIMITS TABLE
-- ============================================================================
-- Tracks daily usage limits for rate limiting
CREATE TABLE IF NOT EXISTS daily_limits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  videos_generated INT DEFAULT 0,
  reviews_completed INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),

  -- Unique constraint: one record per user per day
  UNIQUE(user_id, date)
);

COMMENT ON TABLE daily_limits IS 'Tracks daily usage limits for rate limiting (5 videos, 3 reviews per day)';

-- ============================================================================
-- VIEW HISTORY TABLE
-- ============================================================================
-- Tracks video viewing history
CREATE TABLE IF NOT EXISTS view_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  video_id UUID REFERENCES videos(id) ON DELETE CASCADE,
  watched_at TIMESTAMP DEFAULT NOW(),
  watch_duration INT, -- Duration watched in seconds

  -- Note: User can watch same video multiple times
  -- No unique constraint here
  CHECK (watch_duration >= 0)
);

COMMENT ON TABLE view_history IS 'Tracks user video viewing history and watch time';
COMMENT ON COLUMN view_history.watch_duration IS 'Duration watched in seconds';

-- ============================================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================================
-- Create indexes on frequently queried columns

-- Videos indexes
CREATE INDEX IF NOT EXISTS idx_videos_category ON videos(category);
CREATE INDEX IF NOT EXISTS idx_videos_created_by ON videos(created_by);
CREATE INDEX IF NOT EXISTS idx_videos_published_at ON videos(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_videos_views ON videos(views DESC);

-- Bookmarks indexes
CREATE INDEX IF NOT EXISTS idx_bookmarks_user ON bookmarks(user_id);
CREATE INDEX IF NOT EXISTS idx_bookmarks_video ON bookmarks(video_id);

-- Video generation jobs indexes
CREATE INDEX IF NOT EXISTS idx_video_gen_user ON video_generation_jobs(user_id);
CREATE INDEX IF NOT EXISTS idx_video_gen_status ON video_generation_jobs(status);
CREATE INDEX IF NOT EXISTS idx_video_gen_created ON video_generation_jobs(created_at DESC);

-- Code reviews indexes
CREATE INDEX IF NOT EXISTS idx_reviews_user ON code_reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_status ON code_reviews(status);
CREATE INDEX IF NOT EXISTS idx_reviews_created ON code_reviews(created_at DESC);

-- Daily limits indexes
CREATE INDEX IF NOT EXISTS idx_daily_limits_user_date ON daily_limits(user_id, date);

-- View history indexes
CREATE INDEX IF NOT EXISTS idx_view_history_user ON view_history(user_id);
CREATE INDEX IF NOT EXISTS idx_view_history_video ON view_history(video_id);

-- ============================================================================
-- TRIGGERS AND FUNCTIONS
-- ============================================================================

-- Function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply update_updated_at trigger to all relevant tables
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_user_stats_updated_at ON user_stats;
CREATE TRIGGER update_user_stats_updated_at
  BEFORE UPDATE ON user_stats
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_videos_updated_at ON videos;
CREATE TRIGGER update_videos_updated_at
  BEFORE UPDATE ON videos
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_video_gen_updated_at ON video_generation_jobs;
CREATE TRIGGER update_video_gen_updated_at
  BEFORE UPDATE ON video_generation_jobs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_reviews_updated_at ON code_reviews;
CREATE TRIGGER update_reviews_updated_at
  BEFORE UPDATE ON code_reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- VIEWS (OPTIONAL)
-- ============================================================================

-- View to get videos with bookmark status for a specific user
-- Usage: SELECT * FROM videos_with_bookmarks WHERE user_id = 'some-uuid'
CREATE OR REPLACE VIEW videos_with_user_data AS
SELECT
  v.*,
  COALESCE(b.user_id IS NOT NULL, FALSE) as is_bookmarked,
  b.user_id as bookmarked_by_user
FROM videos v
LEFT JOIN bookmarks b ON v.id = b.video_id;

COMMENT ON VIEW videos_with_user_data IS 'Videos with bookmark status - filter by user_id to get personalized data';

-- ============================================================================
-- INITIAL DATA VERIFICATION
-- ============================================================================

-- Count tables created
DO $$
DECLARE
    table_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO table_count
    FROM information_schema.tables
    WHERE table_schema = 'public'
    AND table_type = 'BASE TABLE';

    RAISE NOTICE '✅ Database schema created successfully!';
    RAISE NOTICE '📊 Total tables created: %', table_count;
    RAISE NOTICE '';
    RAISE NOTICE '📋 Tables created:';
    RAISE NOTICE '   - users';
    RAISE NOTICE '   - user_stats';
    RAISE NOTICE '   - videos';
    RAISE NOTICE '   - bookmarks';
    RAISE NOTICE '   - video_generation_jobs';
    RAISE NOTICE '   - code_reviews';
    RAISE NOTICE '   - daily_limits';
    RAISE NOTICE '   - view_history';
    RAISE NOTICE '';
    RAISE NOTICE '🚀 Next steps:';
    RAISE NOTICE '   1. Update your .env file with Supabase credentials';
    RAISE NOTICE '   2. Run: npm run dev';
    RAISE NOTICE '   3. Test the API at http://localhost:5000';
END $$;

-- ============================================================================
-- END OF SCHEMA
-- ============================================================================
