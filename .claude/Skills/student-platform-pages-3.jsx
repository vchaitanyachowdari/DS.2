// STUDENT LEARNING PLATFORM - PROJECT REVIEWER & PROFILE
// React + Tailwind CSS Implementation (Part 3)

import React, { useState } from 'react';
import {
  GraduationCap, Video, Code, Menu, X, Eye, Clock,
  CheckCircle, AlertCircle, XCircle, Info, Sparkles,
  Github, Mail, Lock, User, ExternalLink, Download,
  Play, Pause, Volume2, Maximize, Settings, Bookmark,
  Search, Filter, ChevronDown, ArrowRight, Star,
  TrendingUp, Calendar, BookOpen, Award, FileText,
  RefreshCw, Heart, Share2, MoreVertical, Trash2,
  Edit, Copy, Link as LinkIcon, Bell, LogOut
} from 'lucide-react';

// =======================
// 7. PROJECT REVIEWER PAGE
// =======================

const ProjectReviewerPage = () => {
  const [repoUrl, setRepoUrl] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [isReviewing, setIsReviewing] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // GitHub URL validation
    const githubPattern = /^https?:\/\/(www\.)?github\.com\/[\w-]+\/[\w.-]+/;
    if (!githubPattern.test(repoUrl)) {
      setIsValid(false);
      setError('Please enter a valid GitHub repository URL');
      return;
    }

    setIsValid(true);
    setIsReviewing(true);
    // Navigate to loading page
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
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
              <a href="/create" className="text-base font-medium text-gray-700 hover:text-primary-600 transition-colors">
                Create Video
              </a>
              <a href="/review" className="text-base font-medium text-primary-600 border-b-2 border-primary-600 pb-1">
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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-100 text-pink-700
                        rounded-full text-sm font-medium mb-6">
            <Code className="w-4 h-4" />
            AI-Powered Code Review
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Get Instant Feedback on Your Project
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Submit your GitHub repository and receive AI-generated code quality
            analysis with actionable suggestions.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* GitHub URL Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                GitHub Repository URL
              </label>
              <div className="relative">
                <input
                  type="url"
                  value={repoUrl}
                  onChange={(e) => {
                    setRepoUrl(e.target.value);
                    setIsValid(true);
                    setError('');
                  }}
                  className={`w-full px-4 py-4 pl-12 bg-white border-2 rounded-lg
                           focus:outline-none placeholder:text-gray-400 transition-all
                           ${isValid
                             ? 'border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-20'
                             : 'border-error-600 focus:border-error-600 focus:ring-2 focus:ring-error-500 focus:ring-opacity-20'
                           }`}
                  placeholder="https://github.com/username/repository"
                  required
                />
                <Github className={`absolute left-4 top-4 w-5 h-5 ${isValid ? 'text-gray-400' : 'text-error-600'}`} />
              </div>
              {!isValid && (
                <p className="text-sm text-error-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </p>
              )}
              <p className="text-sm text-gray-500">
                Repository must be public. Private repos are not supported yet.
              </p>
            </div>

            {/* Examples */}
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm font-medium text-gray-700 mb-2">
                Example repository:
              </p>
              <button
                type="button"
                onClick={() => setRepoUrl('https://github.com/octocat/Hello-World')}
                className="text-sm text-primary-600 hover:text-primary-700 hover:underline"
              >
                https://github.com/octocat/Hello-World
              </button>
            </div>

            {/* Info Banner */}
            <div className="bg-info-50 border border-info-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-info-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-info-700">
                  <p className="font-medium mb-1">What we analyze:</p>
                  <ul className="space-y-0.5">
                    <li>• Code structure and organization</li>
                    <li>• Documentation quality</li>
                    <li>• Best practices compliance</li>
                    <li>• Dependency management</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!repoUrl || isReviewing}
              className="w-full px-8 py-4 bg-primary-600 text-white rounded-lg font-medium text-lg
                       hover:bg-primary-700 active:bg-primary-800
                       focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                       transition-colors disabled:opacity-50 disabled:cursor-not-allowed
                       flex items-center justify-center gap-2"
            >
              {isReviewing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <Code className="w-5 h-5" />
                  <span>Review My Project</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
            <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-6 h-6 text-cyan-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              2-5 Minutes
            </h3>
            <p className="text-sm text-gray-600">
              Analysis time
            </p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Quality Score
            </h3>
            <p className="text-sm text-gray-600">
              0-10 rating
            </p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
            <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Download className="w-6 h-6 text-pink-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              PDF Report
            </h3>
            <p className="text-sm text-gray-600">
              Downloadable
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 bg-warning-50 border border-warning-200 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-warning-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-warning-700">
              <p className="font-medium mb-1">AI-Generated Review</p>
              <p>
                This is an automated analysis meant for educational purposes.
                Use it as a learning guide, not a definitive assessment.
                Rate limit: 3 reviews per day.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


// =======================
// 8. PROJECT REVIEW RESULTS PAGE
// =======================

const ReviewResultsPage = () => {
  const reviewData = {
    repoName: 'machine-learning-project',
    repoUrl: 'https://github.com/johndoe/machine-learning-project',
    reviewDate: 'January 7, 2026',
    qualityScore: 7.8,
    strengths: [
      'Well-organized module structure with clear separation of concerns',
      'Comprehensive README with setup instructions and examples',
      'Good use of type hints for function parameters',
      'Proper error handling in data processing functions'
    ],
    improvements: [
      'Add unit tests to ensure code reliability and catch regressions',
      'Include docstrings for all public functions and classes',
      'Consider using a requirements.txt file for dependency management',
      'Add GitHub Actions for continuous integration'
    ],
    fullReview: `This machine learning project demonstrates a solid understanding of model development and data processing. The code is generally well-structured with clear separation between data loading, preprocessing, and model training components.

The README documentation is particularly strong, providing clear setup instructions and usage examples. The use of type hints enhances code readability and helps prevent type-related bugs.

However, the project would benefit significantly from the addition of unit tests. Testing is crucial for maintaining code quality as the project evolves. Consider using pytest for Python projects.

Additionally, while the code includes good inline comments, adding comprehensive docstrings would make the codebase more accessible to other developers. Follow the Google or NumPy docstring conventions for consistency.

Overall, this is a solid foundation for a machine learning project with room for improvement in testing and documentation practices.`
  };

  const handleDownloadPDF = () => {
    // PDF generation logic
    console.log('Downloading PDF...');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-8 h-8 text-primary-600" />
              <span className="text-xl font-bold text-gray-900">LearnAI</span>
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
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Success Alert */}
        <div className="bg-success-50 border border-success-200 rounded-lg p-4 mb-8
                      flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-success-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-success-900 mb-1">
              Review Complete!
            </h4>
            <p className="text-sm text-success-700">
              Your project has been analyzed. Results are shown below and saved to your history.
            </p>
          </div>
        </div>

        {/* Header */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <Github className="w-6 h-6 text-gray-700" />
                <h1 className="text-2xl font-bold text-gray-900">
                  {reviewData.repoName}
                </h1>
              </div>
              <a href={reviewData.repoUrl}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1">
                {reviewData.repoUrl}
                <ExternalLink className="w-4 h-4" />
              </a>
              <p className="text-sm text-gray-500 mt-2">
                Reviewed on {reviewData.reviewDate}
              </p>
            </div>

            <button
              onClick={handleDownloadPDF}
              className="px-6 py-3 bg-success-600 text-white rounded-lg font-medium
                       hover:bg-success-700 transition-colors
                       flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              Download PDF
            </button>
          </div>

          {/* Quality Score */}
          <div className="flex items-center justify-between py-6 border-t border-b border-gray-200">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Code Quality Score
              </h3>
              <p className="text-sm text-gray-500">
                Based on structure, documentation, and best practices
              </p>
            </div>
            <div className="text-center">
              <div className="text-6xl font-bold text-primary-600">
                {reviewData.qualityScore}
                <span className="text-3xl text-gray-400">/10</span>
              </div>
              <div className="mt-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold
                             bg-primary-100 text-primary-700">
                  Good
                </span>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-primary-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${reviewData.qualityScore * 10}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Poor</span>
              <span>Excellent</span>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-info-50 border border-info-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-info-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-info-700">
              AI-generated review - use as a learning guide, not a definitive assessment.
            </p>
          </div>
        </div>

        {/* Strengths */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-success-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-success-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              Strengths
            </h2>
          </div>
          <ul className="space-y-3">
            {reviewData.strengths.map((strength, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-success-600 flex-shrink-0 mt-0.5" />
                <span className="text-base text-gray-700">{strength}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Areas for Improvement */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-warning-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-warning-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              Areas for Improvement
            </h2>
          </div>
          <ul className="space-y-3">
            {reviewData.improvements.map((improvement, index) => (
              <li key={index} className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-warning-600 flex-shrink-0 mt-0.5" />
                <span className="text-base text-gray-700">{improvement}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Full Review */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-purple-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              Detailed Review
            </h2>
          </div>
          <div className="prose prose-gray max-w-none">
            {reviewData.fullReview.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-base text-gray-700 leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-center gap-4">
          <a href="/review"
             className="px-6 py-3 bg-white border-2 border-gray-300 rounded-lg
                      text-gray-700 font-medium hover:bg-gray-50
                      transition-colors">
            Review Another Project
          </a>
          <a href="/profile/reviews"
             className="px-6 py-3 bg-primary-600 text-white rounded-lg font-medium
                      hover:bg-primary-700 transition-colors">
            View All Reviews
          </a>
        </div>
      </div>
    </div>
  );
};


// =======================
// 9. USER PROFILE PAGE
// =======================

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('videos');

  const user = {
    name: 'John Doe',
    email: 'john.doe@college.edu',
    joined: 'December 2025',
    avatar: 'JD'
  };

  const myVideos = [
    {
      id: 1,
      title: 'Understanding BERT Architecture',
      createdAt: '2 days ago',
      duration: '8:45',
      thumbnail: '/thumb1.jpg'
    },
    {
      id: 2,
      title: 'Introduction to GANs',
      createdAt: '5 days ago',
      duration: '7:20',
      thumbnail: '/thumb2.jpg'
    },
  ];

  const myReviews = [
    {
      id: 1,
      repoName: 'machine-learning-project',
      score: 7.8,
      reviewedAt: '1 week ago'
    },
    {
      id: 2,
      repoName: 'data-analysis-toolkit',
      score: 8.5,
      reviewedAt: '2 weeks ago'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
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
              <a href="/create" className="text-base font-medium text-gray-700 hover:text-primary-600 transition-colors">
                Create Video
              </a>
              <a href="/review" className="text-base font-medium text-gray-700 hover:text-primary-600 transition-colors">
                Review Project
              </a>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold text-white">{user.avatar}</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-8">
          <div className="flex items-start gap-6">
            {/* Avatar */}
            <div className="w-24 h-24 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-3xl font-bold text-white">{user.avatar}</span>
            </div>

            {/* Info */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {user.name}
              </h1>
              <p className="text-base text-gray-600 mb-4">
                {user.email}
              </p>
              <p className="text-sm text-gray-500">
                Member since {user.joined}
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg
                               text-gray-700 font-medium hover:bg-gray-50 transition-colors
                               flex items-center gap-2">
                <Edit className="w-4 h-4" />
                Edit Profile
              </button>
              <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg
                               text-gray-700 font-medium hover:bg-gray-50 transition-colors
                               flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Settings
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-8 pt-8 border-t border-gray-200">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {myVideos.length}
              </div>
              <div className="text-sm text-gray-600">Videos Generated</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {myReviews.length}
              </div>
              <div className="text-sm text-gray-600">Project Reviews</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">
                12
              </div>
              <div className="text-sm text-gray-600">Videos Watched</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('videos')}
              className={`px-1 py-4 text-base font-medium border-b-2 -mb-px transition-all ${
                activeTab === 'videos'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              My Videos ({myVideos.length})
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-1 py-4 text-base font-medium border-b-2 -mb-px transition-all ${
                activeTab === 'reviews'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              My Reviews ({myReviews.length})
            </button>
            <button
              onClick={() => setActiveTab('bookmarks')}
              className={`px-1 py-4 text-base font-medium border-b-2 -mb-px transition-all ${
                activeTab === 'bookmarks'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Bookmarks
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'videos' && (
          <div className="space-y-4">
            {myVideos.map(video => (
              <div key={video.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-6">
                  <div className="w-40 aspect-video bg-gradient-to-br from-primary-100 to-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Play className="w-8 h-8 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {video.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {video.duration}
                      </span>
                      <span>•</span>
                      <span>Created {video.createdAt}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                      <Share2 className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-4">
            {myReviews.map(review => (
              <div key={review.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Code className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {review.repoName}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Reviewed {review.reviewedAt}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary-600">
                        {review.score}
                      </div>
                      <div className="text-xs text-gray-500">Quality Score</div>
                    </div>
                    <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export { ProjectReviewerPage, ReviewResultsPage, ProfilePage };
