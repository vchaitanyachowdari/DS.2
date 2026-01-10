// STUDENT LEARNING PLATFORM - COMPLETE PAGE COMPONENTS
// React + Tailwind CSS Implementation

import React, { useState } from 'react';
import {
  GraduationCap, Video, Code, Menu, X, Eye, Clock,
  CheckCircle, AlertCircle, XCircle, Info, Sparkles,
  Github, Mail, Lock, User, ExternalLink, Download,
  Play, Pause, Volume2, Maximize, Settings, Bookmark,
  Search, Filter, ChevronDown, ArrowRight, Star,
  TrendingUp, Calendar, BookOpen, Award, FileText
} from 'lucide-react';

// =======================
// 1. LANDING PAGE
// =======================

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
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
              <a href="#features" className="text-base font-medium text-gray-700 hover:text-primary-600 transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-base font-medium text-gray-700 hover:text-primary-600 transition-colors">
                How It Works
              </a>
              <a href="/dashboard" className="text-base font-medium text-gray-700 hover:text-primary-600 transition-colors">
                Browse Videos
              </a>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center gap-3">
              <a href="/login" className="px-4 py-2 text-gray-700 font-medium hover:text-primary-600 transition-colors">
                Log In
              </a>
              <a href="/signup" className="px-6 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors">
                Sign Up Free
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-primary-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-primary-200">
                <Sparkles className="w-4 h-4 text-primary-600" />
                <span className="text-sm font-medium text-primary-700">
                  AI-Powered Learning
                </span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Turn Research Papers into
                <span className="text-primary-600"> 5-Minute Videos</span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed">
                Stop drowning in lengthy technical papers. Get AI-generated educational
                videos that distill complex research into clear, concise explanations.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href="/signup" className="px-8 py-4 bg-primary-600 text-white rounded-lg font-medium text-lg
                                           hover:bg-primary-700 transition-colors
                                           flex items-center justify-center gap-2">
                  Get Started Free
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a href="/dashboard" className="px-8 py-4 bg-white text-gray-700 border-2 border-gray-300 rounded-lg font-medium text-lg
                                              hover:bg-gray-50 transition-colors
                                              flex items-center justify-center gap-2">
                  <Play className="w-5 h-5" />
                  Watch Demo
                </a>
              </div>

              {/* Stats */}
              <div className="flex gap-8 pt-8">
                <div>
                  <div className="text-3xl font-bold text-gray-900">100+</div>
                  <div className="text-sm text-gray-600">Curated Videos</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">5-10 min</div>
                  <div className="text-sm text-gray-600">Average Length</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">$0</div>
                  <div className="text-sm text-gray-600">Completely Free</div>
                </div>
              </div>
            </div>

            {/* Right: Visual */}
            <div className="relative">
              <div className="aspect-video bg-gray-900 rounded-2xl shadow-2xl overflow-hidden">
                <img src="/hero-video-preview.jpg" alt="Platform preview"
                     className="w-full h-full object-cover" />
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-40 transition-all cursor-pointer group">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 text-primary-600 ml-1" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Learn Faster
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Three powerful features designed specifically for college students tackling
              complex AI/ML and Data Science content.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1: Dashboard */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8 hover:border-primary-300 hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <Video className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Curated Dashboard
              </h3>
              <p className="text-base text-gray-600 leading-relaxed mb-4">
                Browse 100+ educational videos covering the latest research in AI/ML,
                Data Science, and Computer Vision. New content added weekly from trusted sources.
              </p>
              <a href="/dashboard" className="text-primary-600 font-medium flex items-center gap-1 hover:gap-2 transition-all">
                Explore Videos
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Feature 2: Custom Generation */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8 hover:border-primary-300 hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6 text-cyan-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Custom Video Generation
              </h3>
              <p className="text-base text-gray-600 leading-relaxed mb-4">
                Paste any research paper or technical article URL. Our AI generates a
                personalized 5-10 minute explainer video in minutes.
              </p>
              <a href="/create" className="text-primary-600 font-medium flex items-center gap-1 hover:gap-2 transition-all">
                Try It Now
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Feature 3: Project Review */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8 hover:border-primary-300 hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-6">
                <Code className="w-6 h-6 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                AI Code Review
              </h3>
              <p className="text-base text-gray-600 leading-relaxed mb-4">
                Submit your GitHub project and get instant AI-powered feedback with quality
                scores, suggestions, and a downloadable PDF report.
              </p>
              <a href="/review" className="text-primary-600 font-medium flex items-center gap-1 hover:gap-2 transition-all">
                Review Project
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              From URL to understanding in 3 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Paste URL
              </h3>
              <p className="text-base text-gray-600">
                Copy the link to any research paper or technical article you want to understand.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                AI Generates Video
              </h3>
              <p className="text-base text-gray-600">
                Our AI analyzes the content and creates a clear, educational video explanation in 2-5 minutes.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Watch & Learn
              </h3>
              <p className="text-base text-gray-600">
                Grasp complex concepts quickly without reading 30+ pages of dense academic text.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Learn Smarter?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join students who are transforming how they consume research content.
          </p>
          <a href="/signup" className="inline-flex px-8 py-4 bg-white text-primary-600 rounded-lg font-medium text-lg
                                     hover:bg-gray-100 transition-colors">
            Get Started Free
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap className="w-6 h-6 text-primary-400" />
                <span className="text-lg font-bold text-white">LearnAI</span>
              </div>
              <p className="text-sm text-gray-400">
                AI-powered learning platform for college students.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wide mb-4">
                Product
              </h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/dashboard" className="hover:text-white transition-colors">Dashboard</a></li>
                <li><a href="/create" className="hover:text-white transition-colors">Create Video</a></li>
                <li><a href="/review" className="hover:text-white transition-colors">Review Project</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wide mb-4">
                Company
              </h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/about" className="hover:text-white transition-colors">About</a></li>
                <li><a href="/blog" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wide mb-4">
                Legal
              </h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="/terms" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-sm text-gray-400 text-center">
            © 2026 LearnAI. All rights reserved. Built with ❤️ for students.
          </div>
        </div>
      </footer>
    </div>
  );
};


// =======================
// 2. LOGIN PAGE
// =======================

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // API call logic here
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <GraduationCap className="w-8 h-8 text-primary-600" />
            <span className="text-2xl font-bold text-gray-900">LearnAI</span>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back
            </h1>
            <p className="text-base text-gray-600">
              Log in to continue your learning journey
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="bg-error-50 border border-error-200 rounded-lg p-4 mb-6
                          flex items-start gap-3">
              <XCircle className="w-5 h-5 text-error-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-error-700">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 pl-10 bg-white border-2 border-gray-300 rounded-lg
                           focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-20
                           focus:outline-none placeholder:text-gray-400 transition-all"
                  placeholder="you@college.edu"
                  required
                />
                <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pl-10 bg-white border-2 border-gray-300 rounded-lg
                           focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-20
                           focus:outline-none placeholder:text-gray-400 transition-all"
                  placeholder="••••••••"
                  required
                />
                <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 border-gray-300 rounded text-primary-600
                           focus:ring-2 focus:ring-primary-500 focus:ring-opacity-20"
                />
                <span className="text-sm text-gray-700">Remember me</span>
              </label>
              <a href="/forgot-password" className="text-sm font-medium text-primary-600 hover:text-primary-700">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-6 py-3 bg-primary-600 text-white rounded-lg font-medium
                       hover:bg-primary-700 active:bg-primary-800
                       focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                       transition-colors disabled:opacity-50 disabled:cursor-not-allowed
                       flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Logging in...</span>
                </>
              ) : (
                'Log In'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 border-t border-gray-300" />
            <span className="text-sm text-gray-500">Or continue with</span>
            <div className="flex-1 border-t border-gray-300" />
          </div>

          {/* Google OAuth */}
          <button className="w-full px-6 py-3 bg-white border-2 border-gray-300 rounded-lg font-medium
                           text-gray-700 hover:bg-gray-50 hover:border-gray-400
                           transition-colors flex items-center justify-center gap-3">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Don't have an account?{' '}
            <a href="/signup" className="font-medium text-primary-600 hover:text-primary-700">
              Sign up free
            </a>
          </p>
        </div>
      </div>

      {/* Right Side - Visual (hidden on mobile) */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary-600 to-primary-800 p-12 items-center justify-center">
        <div className="max-w-md text-white space-y-6">
          <h2 className="text-4xl font-bold">
            Learn Faster with AI
          </h2>
          <p className="text-xl text-primary-100">
            Transform complex research papers into 5-10 minute videos and get instant feedback on your projects.
          </p>
          <div className="space-y-4 pt-6">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6" />
              <span className="text-lg">100+ curated educational videos</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6" />
              <span className="text-lg">Custom video generation</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6" />
              <span className="text-lg">AI code review for your projects</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


// =======================
// 3. SIGNUP PAGE
// =======================

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validation and API call logic
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Side - Visual (hidden on mobile) */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary-600 to-primary-800 p-12 items-center justify-center">
        <div className="max-w-md text-white space-y-6">
          <h2 className="text-4xl font-bold">
            Start Your Learning Journey
          </h2>
          <p className="text-xl text-primary-100">
            Join students transforming how they learn from research content.
          </p>
          <div className="grid grid-cols-3 gap-4 pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold">$0</div>
              <div className="text-sm text-primary-100">Completely Free</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">5 min</div>
              <div className="text-sm text-primary-100">Setup Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">∞</div>
              <div className="text-sm text-primary-100">Videos</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <GraduationCap className="w-8 h-8 text-primary-600" />
            <span className="text-2xl font-bold text-gray-900">LearnAI</span>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Create your account
            </h1>
            <p className="text-base text-gray-600">
              Get started for free. No credit card required.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 pl-10 bg-white border-2 border-gray-300 rounded-lg
                           focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-20
                           focus:outline-none placeholder:text-gray-400 transition-all"
                  placeholder="John Doe"
                  required
                />
                <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 pl-10 bg-white border-2 border-gray-300 rounded-lg
                           focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-20
                           focus:outline-none placeholder:text-gray-400 transition-all"
                  placeholder="you@college.edu"
                  required
                />
                <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full px-4 py-3 pl-10 bg-white border-2 border-gray-300 rounded-lg
                           focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-20
                           focus:outline-none placeholder:text-gray-400 transition-all"
                  placeholder="••••••••"
                  required
                />
                <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              </div>
              <p className="text-xs text-gray-500">
                Must be at least 8 characters long
              </p>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  className="w-full px-4 py-3 pl-10 bg-white border-2 border-gray-300 rounded-lg
                           focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-20
                           focus:outline-none placeholder:text-gray-400 transition-all"
                  placeholder="••••••••"
                  required
                />
                <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* Terms Checkbox */}
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                required
                className="w-4 h-4 mt-1 border-gray-300 rounded text-primary-600
                         focus:ring-2 focus:ring-primary-500 focus:ring-opacity-20"
              />
              <span className="text-sm text-gray-700">
                I agree to the{' '}
                <a href="/terms" className="text-primary-600 hover:text-primary-700 font-medium">
                  Terms of Service
                </a>
                {' '}and{' '}
                <a href="/privacy" className="text-primary-600 hover:text-primary-700 font-medium">
                  Privacy Policy
                </a>
              </span>
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-6 py-3 bg-primary-600 text-white rounded-lg font-medium
                       hover:bg-primary-700 active:bg-primary-800
                       focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                       transition-colors disabled:opacity-50 disabled:cursor-not-allowed
                       flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Creating account...</span>
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 border-t border-gray-300" />
            <span className="text-sm text-gray-500">Or sign up with</span>
            <div className="flex-1 border-t border-gray-300" />
          </div>

          {/* Google OAuth */}
          <button className="w-full px-6 py-3 bg-white border-2 border-gray-300 rounded-lg font-medium
                           text-gray-700 hover:bg-gray-50 hover:border-gray-400
                           transition-colors flex items-center justify-center gap-3">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          {/* Log In Link */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{' '}
            <a href="/login" className="font-medium text-primary-600 hover:text-primary-700">
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export { LandingPage, LoginPage, SignupPage };
