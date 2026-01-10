-- Create Storage Buckets for Supabase
-- Run these commands in Supabase SQL Editor

-- 1. Create videos bucket (public)
INSERT INTO storage.buckets (id, name, public)
VALUES ('videos', 'videos', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Create audio bucket (public)
INSERT INTO storage.buckets (id, name, public)
VALUES ('audio', 'audio', true)
ON CONFLICT (id) DO NOTHING;

-- 3. Create thumbnails bucket (public)
INSERT INTO storage.buckets (id, name, public)
VALUES ('thumbnails', 'thumbnails', true)
ON CONFLICT (id) DO NOTHING;

-- 4. Create RLS policies to allow authenticated users to upload

-- Videos bucket policies
CREATE POLICY "Allow authenticated uploads to videos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'videos');

CREATE POLICY "Allow public read access to videos"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'videos');

CREATE POLICY "Allow authenticated delete from videos"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'videos');

-- Audio bucket policies
CREATE POLICY "Allow authenticated uploads to audio"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'audio');

CREATE POLICY "Allow public read access to audio"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'audio');

CREATE POLICY "Allow authenticated delete from audio"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'audio');

-- Thumbnails bucket policies
CREATE POLICY "Allow authenticated uploads to thumbnails"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'thumbnails');

CREATE POLICY "Allow public read access to thumbnails"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'thumbnails');

CREATE POLICY "Allow authenticated delete from thumbnails"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'thumbnails');

-- Alternative: Allow anonymous uploads (for backend service)
-- If your backend uses service role key, this is not needed

CREATE POLICY "Allow service role uploads to videos"
ON storage.objects FOR INSERT
TO anon
WITH CHECK (bucket_id = 'videos');

CREATE POLICY "Allow service role uploads to audio"
ON storage.objects FOR INSERT
TO anon
WITH CHECK (bucket_id = 'audio');

CREATE POLICY "Allow service role uploads to thumbnails"
ON storage.objects FOR INSERT
TO anon
WITH CHECK (bucket_id = 'thumbnails');
