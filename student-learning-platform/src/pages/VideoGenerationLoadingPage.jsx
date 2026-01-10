import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Sparkles, Clock, CheckCircle, AlertCircle, Video, ArrowRight } from 'lucide-react';
import api from '../services/api';

const VideoGenerationLoadingPage = () => {
  const [progress, setProgress] = useState({
    step: 0,
    totalSteps: 3,
    percentage: 0,
    message: 'Starting video generation...'
  });
  const [status, setStatus] = useState('processing'); // processing, completed, failed, cancelled
  const [generatedVideo, setGeneratedVideo] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const jobId = location.state?.jobId;
  const url = location.state?.url || '';

  // Redirect if no jobId
  useEffect(() => {
    if (!jobId) {
      navigate('/create');
    }
  }, [jobId, navigate]);

  // Poll for status updates
  useEffect(() => {
    if (!jobId || status === 'completed' || status === 'failed' || status === 'cancelled') {
      return;
    }

    const pollStatus = async () => {
      try {
        const response = await api.generate.checkStatus(jobId);
        const jobData = response.data;

        setStatus(jobData.status);
        setProgress(jobData.progress || progress);

        if (jobData.status === 'completed' && jobData.video) {
          setGeneratedVideo(jobData.video);
        } else if (jobData.status === 'failed') {
          setError(jobData.error || 'Video generation failed');
        }
      } catch (err) {
        console.error('Status check error:', err.message);
        // Don't set error for polling failures, just retry
      }
    };

    // Initial poll
    pollStatus();

    // Poll every 2 seconds
    const intervalId = setInterval(pollStatus, 2000);

    return () => clearInterval(intervalId);
  }, [jobId, status]);

  const handleCancel = async () => {
    if (!jobId) return;

    if (window.confirm('Are you sure you want to cancel video generation?')) {
      try {
        await api.generate.cancel(jobId);
        setStatus('cancelled');
        navigate('/create');
      } catch (err) {
        console.error('Cancel error:', err.message);
        alert('Failed to cancel generation');
      }
    }
  };

  const handleViewVideo = () => {
    // Navigate to video player page
    if (generatedVideo?.id) {
      navigate(`/video/${generatedVideo.id}`);
    } else {
      navigate('/dashboard');
    }
  };

  // Steps for UI - Updated for full video generation with Manim + TTS
  const steps = [
    {
      id: 1,
      label: 'Extracting content from URL...',
      status: progress.step > 1 ? 'complete' : progress.step === 1 ? 'active' : 'pending'
    },
    {
      id: 2,
      label: 'Generating video script with AI...',
      status: progress.step > 2 ? 'complete' : progress.step === 2 ? 'active' : 'pending'
    },
    {
      id: 3,
      label: 'Creating animated visualizations...',
      status: progress.step > 3 ? 'complete' : progress.step === 3 ? 'active' : 'pending'
    },
    {
      id: 4,
      label: 'Generating AI narration...',
      status: progress.step > 4 ? 'complete' : progress.step === 4 ? 'active' : 'pending'
    },
    {
      id: 5,
      label: 'Synchronizing video and audio...',
      status: progress.step >= 5 ? progress.percentage === 100 ? 'complete' : 'active' : 'pending'
    }
  ];

  // Success State
  if (status === 'completed' && generatedVideo) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="max-w-lg w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          {/* Success Icon */}
          <div className="mb-6">
            <div className="w-20 h-20 mx-auto bg-success-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-success-600" />
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Video Generated Successfully!
          </h2>
          <p className="text-base text-gray-600 mb-6">
            Your educational video is ready to watch.
          </p>

          {/* Video Info */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <div className="flex items-start gap-3">
              <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Video className="w-8 h-8 text-primary-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                  {generatedVideo.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {generatedVideo.description}
                </p>
                <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                  <span>{generatedVideo.duration}</span>
                  <span>•</span>
                  <span>{generatedVideo.category}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button
              onClick={handleViewVideo}
              className="w-full px-6 py-3 bg-primary-600 text-white rounded-lg font-medium
                       hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
            >
              View Video
              <ArrowRight className="w-5 h-5" />
            </button>
            <Link
              to="/create"
              className="block w-full px-6 py-3 bg-white border-2 border-gray-300 text-gray-700
                       rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Generate Another Video
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Failed State
  if (status === 'failed') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="max-w-lg w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          {/* Error Icon */}
          <div className="mb-6">
            <div className="w-20 h-20 mx-auto bg-red-100 rounded-full flex items-center justify-center">
              <AlertCircle className="w-10 h-10 text-red-600" />
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Generation Failed
          </h2>
          <p className="text-base text-gray-600 mb-6">
            {error || 'Something went wrong while generating your video.'}
          </p>

          {/* Error Details */}
          {url && (
            <div className="bg-red-50 rounded-lg p-4 mb-6 text-left">
              <p className="text-xs text-red-600 mb-1">Failed URL:</p>
              <p className="text-sm text-red-800 break-all">{url}</p>
            </div>
          )}

          {/* Actions */}
          <div className="space-y-3">
            <Link
              to="/create"
              className="block w-full px-6 py-3 bg-primary-600 text-white rounded-lg font-medium
                       hover:bg-primary-700 transition-colors"
            >
              Try Again
            </Link>
            <Link
              to="/dashboard"
              className="block w-full px-6 py-3 bg-white border-2 border-gray-300 text-gray-700
                       rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Processing State
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
                          rounded-full animate-spin"
              style={{ animationDuration: '3s' }} />
          </div>
        </div>

        {/* Message */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Generating Your Video
        </h2>
        <p className="text-base text-gray-600 mb-2">
          {progress.message}
        </p>
        <p className="text-sm text-gray-500 mb-8">
          This may take 2-5 minutes. We're analyzing the content and creating
          an educational video just for you.
        </p>

        {/* URL Display */}
        {url && (
          <div className="mb-8 p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500 mb-1">Processing:</p>
            <p className="text-sm text-gray-700 truncate">{url}</p>
          </div>
        )}

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>{progress.percentage}%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary-600 transition-all duration-500 ease-out"
              style={{ width: `${progress.percentage}%` }}
            />
          </div>
        </div>

        {/* Progress Steps */}
        <div className="space-y-4 mb-8">
          {steps.map((step) => (
            <div key={step.id} className="flex items-center gap-3 text-left">
              <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${step.status === 'complete' ? 'bg-success-600' :
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
              <span className={`text-sm font-medium ${step.status === 'complete' ? 'text-success-700' :
                step.status === 'active' ? 'text-primary-700' :
                  'text-gray-400'
                }`}>
                {step.label}
              </span>
            </div>
          ))}
        </div>

        {/* Estimated Time */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            <span>Estimated time: 3-5 minutes</span>
          </div>
        </div>

        {/* Cancel Button */}
        <button
          onClick={handleCancel}
          className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
        >
          Cancel Generation
        </button>
      </div>
    </div>
  );
};

export default VideoGenerationLoadingPage;
