// STUDENT LEARNING PLATFORM - DASHBOARD & FEATURES
// React + Tailwind CSS Implementation (Part 2)

import React, { useState } from 'react';
import {
  GraduationCap, Video, Code, Menu, X, Eye, Clock,
  CheckCircle, AlertCircle, XCircle, Info, Sparkles,
  Github, Mail, Lock, User, ExternalLink, Download,
  Play, Pause, Volume2, Maximize, Settings, Bookmark,
  Search, Filter, ChevronDown, ArrowRight, Star,
  TrendingUp, Calendar, BookOpen, Award, FileText,
  RefreshCw, Heart, Share2, MoreVertical, Trash2,
  Edit, Copy, Link as LinkIcon
} from 'lucide-react';

// =======================
// 4. DASHBOARD PAGE (Video Browsing)
// =======================

const DashboardPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Mock video data
  const videos = [
    {
      id: 1,
      title: 'Understanding Transformer Architecture in Modern NLP',
      thumbnail: '/thumbnails/transformer.jpg',
      duration: '7:32',
      category: 'AI/ML',
      views: 1243,
      publishedAt: '2 days ago',
      description: 'A comprehensive breakdown of attention mechanisms and their role in modern natural language processing.',
      source: 'arXiv'
    },
    {
      id: 2,
      title: 'Deep Dive into Convolutional Neural Networks',
      thumbnail: '/thumbnails/cnn.jpg',
      duration: '9:15',
      category: 'AI/ML',
      views: 892,
      publishedAt: '5 days ago',
      description: 'Explore how CNNs revolutionized computer vision and image classification tasks.',
      source: 'Papers with Code'
    },
    {
      id: 3,
      title: 'Statistical Methods for Data Analysis',
      thumbnail: '/thumbnails/stats.jpg',
      duration: '6:45',
      category: 'Data Science',
      views: 654,
      publishedAt: '1 week ago',
      description: 'Essential statistical techniques every data scientist should master.',
      source: 'Towards Data Science'
    },
    {
      id: 4,
      title: 'Attention is All You Need: Paper Breakdown',
      thumbnail: '/thumbnails/attention.jpg',
      duration: '10:22',
      category: 'Research',
      views: 2103,
      publishedAt: '3 days ago',
      description: 'Complete walkthrough of the groundbreaking transformer paper from Google.',
      source: 'Google AI Blog'
    },
    {
      id: 5,
      title: 'Introduction to Reinforcement Learning',
      thumbnail: '/thumbnails/rl.jpg',
      duration: '8:50',
      category: 'AI/ML',
      views: 1456,
      publishedAt: '4 days ago',
      description: 'Learn the fundamentals of RL algorithms and their applications.',
      source: 'DeepMind Blog'
    },
    {
      id: 6,
      title: 'Feature Engineering Best Practices',
      thumbnail: '/thumbnails/feature-eng.jpg',
      duration: '7:18',
      category: 'Data Science',
      views: 789,
      publishedAt: '6 days ago',
      description: 'Techniques for creating meaningful features from raw data.',
      source: 'Towards Data Science'
    },
  ];

  const categories = ['All', 'AI/ML', 'Data Science', 'Research'];

  const filteredVideos = videos.filter(video => {
    const matchesCategory = activeCategory === 'All' || video.category === activeCategory;
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <GraduationCap className="w-8 h-8 text-primary-600" />
              <span className="text-xl font-bold text-gray-900">LearnAI</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a href="/dashboard" className="text-base font-medium text-primary-600 border-b-2 border-primary-600 pb-1">
                Dashboard
              </a>
              <a href="/create" className="text-base font-medium text-gray-700 hover:text-primary-600 transition-colors">
                Create Video
              </a>
              <a href="/review" className="text-base font-medium text-gray-700 hover:text-primary-600 transition-colors">
                Review Project
              </a>
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-3">
              <button className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
                <Search className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors relative">
                <Bookmark className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-primary-600 rounded-full" />
              </button>
              <div className="flex items-center gap-2 pl-3 border-l border-gray-200">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary-600">JD</span>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-600" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-3">
              Discover Educational Content
            </h1>
            <p className="text-xl text-primary-100">
              Browse 100+ curated videos on AI/ML, Data Science, and Research Papers.
              New content added weekly from trusted sources.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mt-8 max-w-2xl">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for topics, papers, or concepts..."
                className="w-full px-6 py-4 pl-12 bg-white bg-opacity-20 backdrop-blur-sm
                         border-2 border-white border-opacity-30 rounded-lg
                         text-white placeholder:text-primary-200
                         focus:bg-white focus:text-gray-900 focus:placeholder:text-gray-400
                         focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50
                         transition-all"
              />
              <Search className="absolute left-4 top-4 w-5 h-5 text-primary-200" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Category Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex space-x-8" aria-label="Categories">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`
                  px-1 py-4 text-base font-medium border-b-2 -mb-px
                  transition-all duration-200
                  ${activeCategory === category
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                {category}
              </button>
            ))}
          </nav>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg
                             text-sm font-medium text-gray-700
                             hover:bg-gray-50 transition-colors
                             flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filters
            </button>
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg
                             text-sm font-medium text-gray-700
                             hover:bg-gray-50 transition-colors
                             flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Date Range
            </button>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>{filteredVideos.length} videos found</span>
          </div>
        </div>

        {/* Video Grid */}
        {isLoading ? (
          // Skeleton Loaders
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden animate-pulse">
                <div className="aspect-video bg-gray-200" />
                <div className="p-4 space-y-3">
                  <div className="h-5 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-4 bg-gray-200 rounded w-5/6" />
                  <div className="flex justify-between">
                    <div className="h-3 bg-gray-200 rounded w-20" />
                    <div className="h-3 bg-gray-200 rounded w-16" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredVideos.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map(video => (
              <div
                key={video.id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden
                         hover:shadow-lg hover:border-primary-200
                         transition-all duration-200 cursor-pointer group"
              >
                {/* Thumbnail */}
                <div className="aspect-video bg-gray-100 relative overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-primary-100 to-purple-100 flex items-center justify-center">
                    <Video className="w-16 h-16 text-primary-600 opacity-50" />
                  </div>

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30
                                transition-all flex items-center justify-center">
                    <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center
                                  opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100
                                  transition-all">
                      <Play className="w-6 h-6 text-primary-600 ml-0.5" />
                    </div>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute bottom-2 right-2 px-2 py-1 bg-gray-900 bg-opacity-80
                                text-white text-xs font-semibold rounded flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {video.duration}
                  </div>

                  {/* Category Badge */}
                  <div className={`absolute top-2 left-2 px-3 py-1 rounded-full text-xs font-semibold ${
                    video.category === 'AI/ML' ? 'bg-purple-100 text-purple-700' :
                    video.category === 'Data Science' ? 'bg-cyan-100 text-cyan-700' :
                    'bg-pink-100 text-pink-700'
                  }`}>
                    {video.category}
                  </div>

                  {/* Bookmark Icon */}
                  <button className="absolute top-2 right-2 p-1.5 bg-white bg-opacity-90 rounded-full
                                   opacity-0 group-hover:opacity-100 transition-opacity
                                   hover:bg-opacity-100">
                    <Bookmark className="w-4 h-4 text-gray-700" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2
                               group-hover:text-primary-600 transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {video.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {video.publishedAt}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {video.views.toLocaleString()} views
                    </span>
                  </div>
                  <div className="mt-2 pt-2 border-t border-gray-100">
                    <span className="text-xs text-gray-500">Source: {video.source}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Empty State
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No videos found
            </h3>
            <p className="text-base text-gray-500 mb-6 max-w-sm">
              Try adjusting your search or filters to find what you're looking for.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
              className="px-6 py-3 bg-primary-600 text-white rounded-lg font-medium
                       hover:bg-primary-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Load More Button */}
        {filteredVideos.length > 0 && (
          <div className="flex justify-center mt-12">
            <button className="px-8 py-3 bg-white border-2 border-gray-300 rounded-lg
                             text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-400
                             transition-colors flex items-center gap-2">
              <RefreshCw className="w-5 h-5" />
              Load More Videos
            </button>
          </div>
        )}
      </div>
    </div>
  );
};


// =======================
// 5. CUSTOM VIDEO GENERATION PAGE
// =======================

const CreateVideoPage = () => {
  const [url, setUrl] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // URL validation
    try {
      new URL(url);
      setIsValid(true);
      setIsGenerating(true);
      // Navigate to loading page
    } catch {
      setIsValid(false);
      setError('Please enter a valid URL');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation - Same as Dashboard */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-8 h-8 text-primary-600" />
              <span className="text-xl font-bold text-gray-900">LearnAI</span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <a href="/dashboard" className="text-base font-medium text-gray-700 hover:text-primary-600 transition-colors">
                Dashboard
              </a>
              <a href="/create" className="text-base font-medium text-primary-600 border-b-2 border-primary-600 pb-1">
                Create Video
              </a>
              <a href="/review" className="text-base font-medium text-gray-700 hover:text-primary-600 transition-colors">
                Review Project
              </a>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold text-primary-600">JD</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-700
                        rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            AI-Powered Video Generation
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Create Your Own Learning Video
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Paste any research paper or technical article URL and get a personalized
            5-10 minute educational video in minutes.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* URL Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Article or Paper URL
              </label>
              <div className="relative">
                <input
                  type="url"
                  value={url}
                  onChange={(e) => {
                    setUrl(e.target.value);
                    setIsValid(true);
                    setError('');
                  }}
                  className={`w-full px-4 py-4 pl-12 bg-white border-2 rounded-lg
                           focus:outline-none placeholder:text-gray-400 transition-all
                           ${isValid
                             ? 'border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-20'
                             : 'border-error-600 focus:border-error-600 focus:ring-2 focus:ring-error-500 focus:ring-opacity-20'
                           }`}
                  placeholder="https://arxiv.org/abs/..."
                  required
                />
                <LinkIcon className={`absolute left-4 top-4 w-5 h-5 ${isValid ? 'text-gray-400' : 'text-error-600'}`} />
              </div>
              {!isValid && (
                <p className="text-sm text-error-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </p>
              )}
              <p className="text-sm text-gray-500">
                Supported sources: arXiv, research papers, technical blogs, educational articles
              </p>
            </div>

            {/* Examples */}
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm font-medium text-gray-700 mb-2">
                Example URLs:
              </p>
              <div className="space-y-1 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">•</span>
                  <button
                    type="button"
                    onClick={() => setUrl('https://arxiv.org/abs/1706.03762')}
                    className="text-primary-600 hover:text-primary-700 hover:underline text-left"
                  >
                    https://arxiv.org/abs/1706.03762 (Attention is All You Need)
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">•</span>
                  <button
                    type="button"
                    onClick={() => setUrl('https://openai.com/research/gpt-4')}
                    className="text-primary-600 hover:text-primary-700 hover:underline text-left"
                  >
                    https://openai.com/research/gpt-4
                  </button>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!url || isGenerating}
              className="w-full px-8 py-4 bg-primary-600 text-white rounded-lg font-medium text-lg
                       hover:bg-primary-700 active:bg-primary-800
                       focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                       transition-colors disabled:opacity-50 disabled:cursor-not-allowed
                       flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Generate Video</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Info Section */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
            <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-6 h-6 text-cyan-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              2-5 Minutes
            </h3>
            <p className="text-sm text-gray-600">
              Average generation time
            </p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Video className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              5-10 Minutes
            </h3>
            <p className="text-sm text-gray-600">
              Video length
            </p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
            <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bookmark className="w-6 h-6 text-pink-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Auto-Saved
            </h3>
            <p className="text-sm text-gray-600">
              To your library
            </p>
          </div>
        </div>

        {/* Tips */}
        <div className="mt-8 bg-info-50 border border-info-200 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-info-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-info-900 mb-2">
                Tips for Best Results
              </h4>
              <ul className="text-sm text-info-700 space-y-1">
                <li>• Use publicly accessible URLs (no paywalls or login requirements)</li>
                <li>• Longer articles may take more time to process</li>
                <li>• Complex mathematical content will be simplified for clarity</li>
                <li>• You can generate up to 5 videos per day</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


// =======================
// 6. VIDEO GENERATION LOADING PAGE
// =======================

const VideoGenerationLoadingPage = () => {
  const [progress, setProgress] = useState(1);

  // Simulate progress (in real app, this would come from backend)
  React.useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => (prev < 3 ? prev + 1 : prev));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    { id: 1, label: 'Extracting content from URL...', status: progress >= 1 ? 'complete' : 'pending' },
    { id: 2, label: 'Generating script with AI...', status: progress >= 2 ? 'active' : progress > 2 ? 'complete' : 'pending' },
    { id: 3, label: 'Creating video with narration...', status: progress >= 3 ? 'active' : 'pending' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        {/* Animated Icon */}
        <div className="mb-8 relative">
          <div className="w-24 h-24 mx-auto bg-primary-100 rounded-full
                        flex items-center justify-center relative z-10">
            <Sparkles className="w-12 h-12 text-primary-600 animate-pulse" />
          </div>
          {/* Spinning Rings */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 border-4 border-primary-200 border-t-primary-600
                          rounded-full animate-spin" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-40 h-40 border-4 border-purple-200 border-t-purple-600
                          rounded-full animate-spin animation-delay-150"
                 style={{animationDuration: '3s'}} />
          </div>
        </div>

        {/* Message */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Generating Your Video
        </h2>
        <p className="text-base text-gray-600 mb-8">
          This may take 2-5 minutes. We're analyzing the content and creating
          an educational video just for you.
        </p>

        {/* Progress Steps */}
        <div className="space-y-4 mb-8">
          {steps.map((step) => (
            <div key={step.id} className="flex items-center gap-3 text-left">
              <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                step.status === 'complete' ? 'bg-success-600' :
                step.status === 'active' ? 'bg-primary-600' :
                'bg-gray-200'
              }`}>
                {step.status === 'complete' ? (
                  <CheckCircle className="w-5 h-5 text-white" />
                ) : step.status === 'active' ? (
                  <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Clock className="w-4 h-4 text-gray-400" />
                )}
              </div>
              <span className={`text-sm font-medium ${
                step.status === 'complete' ? 'text-success-700' :
                step.status === 'active' ? 'text-primary-700' :
                'text-gray-400'
              }`}>
                {step.label}
              </span>
            </div>
          ))}
        </div>

        {/* Estimated Time */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            <span>Estimated time remaining: 2-3 minutes</span>
          </div>
        </div>

        {/* Cancel Button */}
        <button className="mt-6 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
          Cancel Generation
        </button>
      </div>
    </div>
  );
};

export { DashboardPage, CreateVideoPage, VideoGenerationLoadingPage };
