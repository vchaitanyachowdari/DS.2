import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { GraduationCap, Headphones, CheckCircle, XCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

/**
 * AudioGenerationLoadingPage
 * Shows progress while audio overview is being generated
 */
const AudioGenerationLoadingPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const [status, setStatus] = useState('processing');
    const [progress, setProgress] = useState({
        step: 'starting',
        percentage: 0,
        message: 'Starting audio generation...'
    });
    const [error, setError] = useState(null);
    const [result, setResult] = useState(null);

    const jobId = location.state?.jobId;
    const sourceUrl = location.state?.sourceUrl;

    // Poll for job status
    useEffect(() => {
        if (!jobId) {
            navigate('/audio/create');
            return;
        }

        const pollInterval = setInterval(async () => {
            try {
                const response = await api.audio.getJobStatus(jobId);

                if (response.success) {
                    const { status: jobStatus, progress: jobProgress, error: jobError, result: jobResult, audio } = response.data;

                    setStatus(jobStatus);
                    if (jobProgress) setProgress(jobProgress);
                    if (jobError) setError(jobError);
                    if (jobResult) setResult(jobResult);

                    // Stop polling if completed or failed
                    if (jobStatus === 'completed' || jobStatus === 'failed' || jobStatus === 'cancelled') {
                        clearInterval(pollInterval);

                        if (jobStatus === 'completed' && (jobResult || audio)) {
                            // Navigate to audio player after a short delay
                            setTimeout(() => {
                                navigate('/audio/player', {
                                    state: {
                                        audio: audio || jobResult,
                                        jobId
                                    }
                                });
                            }, 1500);
                        }
                    }
                }
            } catch (err) {
                console.error('Error polling job status:', err);
            }
        }, 2000); // Poll every 2 seconds

        return () => clearInterval(pollInterval);
    }, [jobId, navigate]);

    // Cancel generation
    const handleCancel = async () => {
        try {
            await api.audio.cancelJob(jobId);
            navigate('/audio/create');
        } catch (err) {
            console.error('Failed to cancel:', err);
        }
    };

    // Get step icon
    const getStepClass = (stepName) => {
        const steps = ['extracting', 'generating_script', 'generating_audio', 'mixing', 'completed'];
        const currentIndex = steps.indexOf(progress.step);
        const stepIndex = steps.indexOf(stepName);

        if (stepIndex < currentIndex) return 'completed';
        if (stepIndex === currentIndex) return 'active';
        return 'pending';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
            {/* Header */}
            <nav className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <Link to="/" className="flex items-center gap-2">
                            <GraduationCap className="w-8 h-8 text-primary-600" />
                            <span className="text-xl font-bold text-gray-900">LearnAI</span>
                        </Link>
                        {user && (
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                                    <span className="text-sm font-semibold text-primary-600">{user.avatar}</span>
                                </div>
                                <button
                                    onClick={logout}
                                    className="text-sm text-gray-600 hover:text-gray-900"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            <div className="max-w-2xl mx-auto px-6 py-16">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-8 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                            <Headphones className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold mb-2">
                            {status === 'completed' ? 'Audio Ready!' :
                                status === 'failed' ? 'Generation Failed' :
                                    'Creating Your Audio Overview'}
                        </h1>
                        <p className="text-purple-100">
                            {status === 'completed' ? 'Your podcast-style audio is ready to play' :
                                status === 'failed' ? error || 'Something went wrong' :
                                    'This usually takes 3-5 minutes'}
                        </p>
                    </div>

                    {/* Progress content */}
                    <div className="p-8">
                        {status !== 'failed' && status !== 'cancelled' && (
                            <>
                                {/* Progress bar */}
                                <div className="mb-8">
                                    <div className="flex justify-between text-sm text-gray-500 mb-2">
                                        <span>{progress.message}</span>
                                        <span>{progress.percentage}%</span>
                                    </div>
                                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-500"
                                            style={{ width: `${progress.percentage}%` }}
                                        />
                                    </div>
                                </div>

                                {/* Steps */}
                                <div className="space-y-4">
                                    {[
                                        { id: 'extracting', label: 'Extracting content from URL' },
                                        { id: 'generating_script', label: 'Creating dialogue script with AI' },
                                        { id: 'generating_audio', label: 'Converting to speech' },
                                        { id: 'mixing', label: 'Mixing final podcast' },
                                        { id: 'completed', label: 'Complete!' }
                                    ].map((step) => {
                                        const stepClass = getStepClass(step.id);
                                        return (
                                            <div key={step.id} className="flex items-center gap-3">
                                                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${stepClass === 'completed' ? 'bg-green-500' :
                                                        stepClass === 'active' ? 'bg-purple-500 animate-pulse' :
                                                            'bg-gray-200'
                                                    }`}>
                                                    {stepClass === 'completed' ? (
                                                        <CheckCircle className="w-4 h-4 text-white" />
                                                    ) : stepClass === 'active' ? (
                                                        <div className="w-2 h-2 bg-white rounded-full" />
                                                    ) : (
                                                        <div className="w-2 h-2 bg-gray-400 rounded-full" />
                                                    )}
                                                </div>
                                                <span className={`text-sm ${stepClass === 'completed' ? 'text-green-600 font-medium' :
                                                        stepClass === 'active' ? 'text-purple-600 font-medium' :
                                                            'text-gray-400'
                                                    }`}>
                                                    {step.label}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Cancel button */}
                                {status === 'processing' && (
                                    <div className="mt-8 text-center">
                                        <button
                                            onClick={handleCancel}
                                            className="text-sm text-gray-500 hover:text-gray-700 underline"
                                        >
                                            Cancel generation
                                        </button>
                                    </div>
                                )}
                            </>
                        )}

                        {/* Error state */}
                        {status === 'failed' && (
                            <div className="text-center">
                                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <XCircle className="w-8 h-8 text-red-500" />
                                </div>
                                <p className="text-gray-600 mb-6">{error}</p>
                                <Link
                                    to="/audio/create"
                                    className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
                                >
                                    Try Again
                                </Link>
                            </div>
                        )}

                        {/* Success state - auto redirect */}
                        {status === 'completed' && (
                            <div className="text-center">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle className="w-8 h-8 text-green-500" />
                                </div>
                                <p className="text-gray-600 mb-2">Redirecting to your audio...</p>
                                <div className="animate-spin w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full mx-auto" />
                            </div>
                        )}
                    </div>

                    {/* Footer with source URL */}
                    {sourceUrl && (
                        <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
                            <p className="text-xs text-gray-500 truncate">
                                Source: <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">{sourceUrl}</a>
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AudioGenerationLoadingPage;
