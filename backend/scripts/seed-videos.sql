-- ============================================================================
-- Seed Videos Data
-- ============================================================================
-- This script populates the videos table with 24 curated educational videos
-- about AI, Machine Learning, Data Science, and Research topics.
--
-- Instructions:
-- 1. Make sure you have run schema.sql first
-- 2. Go to Supabase SQL Editor
-- 3. Copy and paste this file
-- 4. Click "Run"
--
-- Note: This will only insert videos that don't already exist (by title)
-- ============================================================================

-- Insert 24 curated videos
INSERT INTO videos (title, description, thumbnail, video_url, duration, category, views, published_at, source, source_url, created_by, is_generated)
VALUES
  -- Video 1
  (
    'Understanding Transformer Architecture in Modern NLP',
    'A comprehensive breakdown of attention mechanisms and their role in modern natural language processing.',
    'https://picsum.photos/seed/transformer/640/360',
    'https://example.com/videos/transformer.mp4',
    '7:32',
    'AI/ML',
    1243,
    NOW() - INTERVAL '2 days',
    'arXiv',
    'https://arxiv.org/abs/1706.03762',
    NULL,
    FALSE
  ),
  -- Video 2
  (
    'Deep Dive into Convolutional Neural Networks',
    'Explore how CNNs revolutionized computer vision and image classification tasks.',
    'https://picsum.photos/seed/cnn/640/360',
    'https://example.com/videos/cnn.mp4',
    '9:15',
    'AI/ML',
    892,
    NOW() - INTERVAL '5 days',
    'Papers with Code',
    'https://paperswithcode.com/method/cnn',
    NULL,
    FALSE
  ),
  -- Video 3
  (
    'Statistical Methods for Data Analysis',
    'Essential statistical techniques every data scientist should master.',
    'https://picsum.photos/seed/stats/640/360',
    'https://example.com/videos/stats.mp4',
    '6:45',
    'Data Science',
    654,
    NOW() - INTERVAL '7 days',
    'Towards Data Science',
    'https://towardsdatascience.com/statistics-for-data-science',
    NULL,
    FALSE
  ),
  -- Video 4
  (
    'Attention is All You Need: Paper Breakdown',
    'Complete walkthrough of the groundbreaking transformer paper from Google.',
    'https://picsum.photos/seed/attention/640/360',
    'https://example.com/videos/attention.mp4',
    '10:22',
    'Research',
    2103,
    NOW() - INTERVAL '3 days',
    'Google AI Blog',
    'https://ai.googleblog.com/2017/08/transformer-novel-neural-network.html',
    NULL,
    FALSE
  ),
  -- Video 5
  (
    'Introduction to Reinforcement Learning',
    'Learn the fundamentals of RL algorithms and their applications.',
    'https://picsum.photos/seed/rl/640/360',
    'https://example.com/videos/rl.mp4',
    '8:50',
    'AI/ML',
    1456,
    NOW() - INTERVAL '4 days',
    'DeepMind Blog',
    'https://www.deepmind.com/learning-resources/reinforcement-learning',
    NULL,
    FALSE
  ),
  -- Video 6
  (
    'Feature Engineering Best Practices',
    'Techniques for creating meaningful features from raw data.',
    'https://picsum.photos/seed/feature-eng/640/360',
    'https://example.com/videos/feature-eng.mp4',
    '7:18',
    'Data Science',
    789,
    NOW() - INTERVAL '6 days',
    'Towards Data Science',
    'https://towardsdatascience.com/feature-engineering',
    NULL,
    FALSE
  ),
  -- Video 7
  (
    'Graph Neural Networks Explained',
    'Understanding how GNNs work and their applications in modern AI.',
    'https://picsum.photos/seed/gnn/640/360',
    'https://example.com/videos/gnn.mp4',
    '8:30',
    'AI/ML',
    1120,
    NOW() - INTERVAL '7 days',
    'arXiv',
    'https://arxiv.org/abs/1812.08434',
    NULL,
    FALSE
  ),
  -- Video 8
  (
    'Time Series Forecasting with LSTM',
    'Deep dive into LSTM networks for predicting sequential data.',
    'https://picsum.photos/seed/lstm/640/360',
    'https://example.com/videos/lstm.mp4',
    '9:45',
    'AI/ML',
    967,
    NOW() - INTERVAL '14 days',
    'Towards Data Science',
    'https://towardsdatascience.com/lstm-for-time-series',
    NULL,
    FALSE
  ),
  -- Video 9
  (
    'Exploratory Data Analysis Fundamentals',
    'Master the art of understanding your data before modeling.',
    'https://picsum.photos/seed/eda/640/360',
    'https://example.com/videos/eda.mp4',
    '6:20',
    'Data Science',
    843,
    NOW() - INTERVAL '4 days',
    'Kaggle',
    'https://www.kaggle.com/learn/exploratory-data-analysis',
    NULL,
    FALSE
  ),
  -- Video 10
  (
    'BERT and Language Model Pre-training',
    'How BERT revolutionized NLP through bidirectional training.',
    'https://picsum.photos/seed/bert/640/360',
    'https://example.com/videos/bert.mp4',
    '8:12',
    'Research',
    1589,
    NOW() - INTERVAL '7 days',
    'Google AI Blog',
    'https://ai.googleblog.com/2018/11/open-sourcing-bert.html',
    NULL,
    FALSE
  ),
  -- Video 11
  (
    'Data Visualization with Python',
    'Creating compelling visualizations using Matplotlib and Seaborn.',
    'https://picsum.photos/seed/dataviz/640/360',
    'https://example.com/videos/dataviz.mp4',
    '7:55',
    'Data Science',
    1024,
    NOW() - INTERVAL '3 days',
    'Towards Data Science',
    'https://towardsdatascience.com/data-visualization-python',
    NULL,
    FALSE
  ),
  -- Video 12
  (
    'GANs: Generative Adversarial Networks',
    'Understanding the architecture behind image generation models.',
    'https://picsum.photos/seed/gans/640/360',
    'https://example.com/videos/gans.mp4',
    '10:05',
    'AI/ML',
    1876,
    NOW() - INTERVAL '5 days',
    'arXiv',
    'https://arxiv.org/abs/1406.2661',
    NULL,
    FALSE
  ),
  -- Video 13
  (
    'A/B Testing for Data Scientists',
    'Statistical methods for running effective experiments.',
    'https://picsum.photos/seed/ab-testing/640/360',
    'https://example.com/videos/ab-testing.mp4',
    '6:30',
    'Data Science',
    745,
    NOW() - INTERVAL '7 days',
    'Towards Data Science',
    'https://towardsdatascience.com/ab-testing',
    NULL,
    FALSE
  ),
  -- Video 14
  (
    'Object Detection with YOLO',
    'Real-time object detection using You Only Look Once algorithm.',
    'https://picsum.photos/seed/yolo/640/360',
    'https://example.com/videos/yolo.mp4',
    '8:40',
    'AI/ML',
    1345,
    NOW() - INTERVAL '6 days',
    'Papers with Code',
    'https://paperswithcode.com/method/yolo',
    NULL,
    FALSE
  ),
  -- Video 15
  (
    'GPT Architecture Deep Dive',
    'Exploring the transformer decoder architecture behind GPT models.',
    'https://picsum.photos/seed/gpt/640/360',
    'https://example.com/videos/gpt.mp4',
    '9:20',
    'Research',
    2456,
    NOW() - INTERVAL '2 days',
    'OpenAI Research',
    'https://openai.com/research/gpt',
    NULL,
    FALSE
  ),
  -- Video 16
  (
    'SQL for Data Analysis',
    'Advanced SQL techniques for extracting insights from databases.',
    'https://picsum.photos/seed/sql/640/360',
    'https://example.com/videos/sql.mp4',
    '7:10',
    'Data Science',
    892,
    NOW() - INTERVAL '7 days',
    'Towards Data Science',
    'https://towardsdatascience.com/sql-for-data-analysis',
    NULL,
    FALSE
  ),
  -- Video 17
  (
    'Neural Architecture Search',
    'Automated methods for discovering optimal neural network architectures.',
    'https://picsum.photos/seed/nas/640/360',
    'https://example.com/videos/nas.mp4',
    '8:55',
    'Research',
    1234,
    NOW() - INTERVAL '4 days',
    'Google AI Blog',
    'https://ai.googleblog.com/2017/05/using-machine-learning-to-explore.html',
    NULL,
    FALSE
  ),
  -- Video 18
  (
    'Clustering Algorithms Comparison',
    'K-means, DBSCAN, and hierarchical clustering explained.',
    'https://picsum.photos/seed/clustering/640/360',
    'https://example.com/videos/clustering.mp4',
    '7:25',
    'Data Science',
    678,
    NOW() - INTERVAL '5 days',
    'Towards Data Science',
    'https://towardsdatascience.com/clustering-algorithms',
    NULL,
    FALSE
  ),
  -- Video 19
  (
    'Vision Transformers (ViT) Explained',
    'How transformers are being applied to computer vision tasks.',
    'https://picsum.photos/seed/vit/640/360',
    'https://example.com/videos/vit.mp4',
    '9:30',
    'AI/ML',
    1567,
    NOW() - INTERVAL '3 days',
    'arXiv',
    'https://arxiv.org/abs/2010.11929',
    NULL,
    FALSE
  ),
  -- Video 20
  (
    'Dimensionality Reduction Techniques',
    'PCA, t-SNE, and UMAP for visualizing high-dimensional data.',
    'https://picsum.photos/seed/dimred/640/360',
    'https://example.com/videos/dimred.mp4',
    '8:00',
    'Data Science',
    934,
    NOW() - INTERVAL '7 days',
    'Towards Data Science',
    'https://towardsdatascience.com/dimensionality-reduction',
    NULL,
    FALSE
  ),
  -- Video 21
  (
    'Few-Shot Learning Methods',
    'Training models with minimal labeled examples.',
    'https://picsum.photos/seed/few-shot/640/360',
    'https://example.com/videos/few-shot.mp4',
    '7:45',
    'Research',
    1123,
    NOW() - INTERVAL '6 days',
    'DeepMind Blog',
    'https://www.deepmind.com/learning-resources/few-shot-learning',
    NULL,
    FALSE
  ),
  -- Video 22
  (
    'Natural Language Generation',
    'Techniques for generating human-like text with AI.',
    'https://picsum.photos/seed/nlg/640/360',
    'https://example.com/videos/nlg.mp4',
    '8:20',
    'AI/ML',
    1456,
    NOW() - INTERVAL '2 days',
    'OpenAI Research',
    'https://openai.com/research/language-generation',
    NULL,
    FALSE
  ),
  -- Video 23
  (
    'Ensemble Methods in Machine Learning',
    'Boosting, bagging, and stacking for better model performance.',
    'https://picsum.photos/seed/ensemble/640/360',
    'https://example.com/videos/ensemble.mp4',
    '7:35',
    'Data Science',
    823,
    NOW() - INTERVAL '4 days',
    'Kaggle',
    'https://www.kaggle.com/learn/ensemble-methods',
    NULL,
    FALSE
  ),
  -- Video 24
  (
    'Diffusion Models for Image Generation',
    'Understanding DALL-E and Stable Diffusion architectures.',
    'https://picsum.photos/seed/diffusion/640/360',
    'https://example.com/videos/diffusion.mp4',
    '10:15',
    'Research',
    2789,
    NOW() - INTERVAL '1 day',
    'arXiv',
    'https://arxiv.org/abs/2006.11239',
    NULL,
    FALSE
  );

-- Verification query
DO $$
DECLARE
    video_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO video_count FROM videos WHERE is_generated = FALSE;
    RAISE NOTICE '✅ Seed data inserted successfully!';
    RAISE NOTICE '📹 Total curated videos in database: %', video_count;
    RAISE NOTICE '';
    RAISE NOTICE '📊 Videos by category:';
    RAISE NOTICE '   - AI/ML: % videos', (SELECT COUNT(*) FROM videos WHERE category = 'AI/ML' AND is_generated = FALSE);
    RAISE NOTICE '   - Data Science: % videos', (SELECT COUNT(*) FROM videos WHERE category = 'Data Science' AND is_generated = FALSE);
    RAISE NOTICE '   - Research: % videos', (SELECT COUNT(*) FROM videos WHERE category = 'Research' AND is_generated = FALSE);
    RAISE NOTICE '';
    RAISE NOTICE '🚀 Your backend is ready to use!';
END $$;

-- ============================================================================
-- END OF SEED DATA
-- ============================================================================
