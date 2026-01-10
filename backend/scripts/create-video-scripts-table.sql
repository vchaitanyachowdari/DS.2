-- Create video_scripts table to store generated scripts
-- This stores the AI-generated scripts before video rendering

CREATE TABLE IF NOT EXISTS video_scripts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    source_url TEXT,
    slides JSONB NOT NULL,
    total_duration VARCHAR(20),
    category VARCHAR(50) DEFAULT 'AI/ML',
    status VARCHAR(50) DEFAULT 'pending', -- pending, rendering, completed, failed
    video_id UUID REFERENCES videos(id),
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX idx_video_scripts_status ON video_scripts(status);
CREATE INDEX idx_video_scripts_created_by ON video_scripts(created_by);
CREATE INDEX idx_video_scripts_created_at ON video_scripts(created_at DESC);

-- Add comment
COMMENT ON TABLE video_scripts IS 'Stores AI-generated video scripts before and after rendering';
