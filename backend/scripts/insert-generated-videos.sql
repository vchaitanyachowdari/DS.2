-- Insert the AI Unveiled generated video into the database
-- Run this in Supabase SQL Editor

INSERT INTO videos (
  title,
  description,
  thumbnail,
  video_url,
  duration,
  category,
  views,
  source,
  source_url,
  transcript,
  is_generated,
  published_at,
  created_at
) VALUES (
  'AI Unveiled: Transforming Today''s World',
  'Dive into the fascinating world of Artificial Intelligence (AI) and discover how it''s reshaping industries, from healthcare to entertainment. Learn about the goals, applications, and ethical concerns surrounding AI in an engaging and accessible way.',
  'https://via.placeholder.com/1280x720/6366f1/ffffff?text=AI+Unveiled',
  '/videos/ai_unveiled_synced.mp4',
  '2:39',
  'AI/ML',
  0,
  'AI Generated',
  NULL,
  '[{"slideNumber":1,"heading":"Introduction","narration":"Welcome to the incredible journey into Artificial Intelligence, or AI...","duration":30},{"slideNumber":2,"heading":"What is AI?","narration":"At its core, AI is the brains behind machines...","duration":45},{"slideNumber":3,"heading":"The Evolution of AI","narration":"The journey of AI began in the 1950s...","duration":45},{"slideNumber":4,"heading":"AI Goals and Research","narration":"AI aims to mimic human intelligence...","duration":45},{"slideNumber":5,"heading":"Real-World AI Applications","narration":"AI is not just theory; it''s all around us...","duration":60},{"slideNumber":6,"heading":"Ethics and AI","narration":"But with great power comes great responsibility...","duration":45},{"slideNumber":7,"heading":"The Future of AI","narration":"What lies ahead for AI? The possibilities are vast...","duration":45},{"slideNumber":8,"heading":"Conclusion","narration":"As we stand on the brink of AI''s potential...","duration":30}]',
  true,
  NOW(),
  NOW()
);

-- Also insert the ML Introduction video
INSERT INTO videos (
  title,
  description,
  thumbnail,
  video_url,
  duration,
  category,
  views,
  source,
  source_url,
  transcript,
  is_generated,
  published_at,
  created_at
) VALUES (
  'Introduction to Machine Learning',
  'A beginner-friendly guide to understanding machine learning concepts. Learn about supervised learning, neural networks, training processes, and real-world applications.',
  'https://via.placeholder.com/1280x720/8b5cf6/ffffff?text=Machine+Learning',
  '/videos/ml_intro_sample.mp4',
  '2:53',
  'AI/ML',
  0,
  'AI Generated',
  NULL,
  '[{"title":"What is Machine Learning?","narration":"Welcome to this introduction to machine learning...","duration":45},{"title":"Types of Machine Learning","narration":"There are three main types of machine learning...","duration":40},{"title":"Supervised Learning","narration":"In supervised learning, we have input data and corresponding output labels...","duration":35},{"title":"Neural Networks","narration":"Neural networks are inspired by the human brain...","duration":40},{"title":"Training a Model","narration":"Training a machine learning model involves several steps...","duration":45},{"title":"Key Concepts","narration":"Some important concepts in machine learning...","duration":40},{"title":"Real World Applications","narration":"Machine learning powers many applications we use daily...","duration":35},{"title":"Getting Started","narration":"To get started with machine learning...","duration":40}]',
  true,
  NOW() - INTERVAL '1 day',
  NOW() - INTERVAL '1 day'
);
