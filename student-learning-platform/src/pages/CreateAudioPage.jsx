import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    GraduationCap, Headphones, Sparkles, ArrowRight, Clock,
    MessageCircle, Lightbulb, ArrowLeft
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

/**
 * CreateAudioPage
 * Allows users to generate NotebookLM-style Audio Overviews from URLs
 */
const CreateAudioPage = () => {
    const [url, setUrl] = useState('');
    const [options, setOptions] = useState({
        targetAudience: 'college students',
        focusArea: '',
        duration: '5-8 minutes',
        tone: 'friendly and engaging'
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showAdvanced, setShowAdvanced] = useState(false);

    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        // Basic URL validation
        try {
            new URL(url);
        } catch {
            setError('Please enter a valid URL');
            return;
        }

        setIsLoading(true);

        try {
            const response = await api.audio.generate(url, options);

            if (response.success) {
                // Navigate to loading page with job ID
                navigate('/audio/generating', {
                    state: {
                        jobId: response.data.jobId,
                        sourceUrl: url
                    }
                });
            }
        } catch (err) {
            setError(err.message || 'Failed to start audio generation. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const audienceOptions = [
        'complete beginners',
        'high school students',
        'college students',
        'graduate students',
        'professionals',
        'experts in the field'
    ];

    const durationOptions = [
        '2-4 minutes',
        '5-8 minutes',
        '8-12 minutes',
        '12-15 minutes'
    ];

    const toneOptions = [
        'friendly and engaging',
        'formal and academic',
        'casual and fun',
        'serious and thorough'
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header */}
            <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <Link to="/" className="flex items-center gap-2">
                            <GraduationCap className="w-8 h-8 text-primary-600" />
                            <span className="text-xl font-bold text-gray-900">LearnAI</span>
                        </Link>

                        <div className="hidden md:flex items-center gap-8">
                            <Link to="/dashboard" className="text-base font-medium text-gray-700 hover:text-primary-600 transition-colors">
                                Dashboard
                            </Link>
                            <Link to="/create" className="text-base font-medium text-gray-700 hover:text-primary-600 transition-colors">
                                Create Video
                            </Link>
                            <Link to="/audio/create" className="text-base font-medium text-primary-600 border-b-2 border-primary-600 pb-1">
                                Audio Overview
                            </Link>
                            <Link to="/review" className="text-base font-medium text-gray-700 hover:text-primary-600 transition-colors">
                                Review Project
                            </Link>
                        </div>

                        {user && (
                            <div className="flex items-center gap-2 pl-3 border-l border-gray-200">
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

            <div className="max-w-4xl mx-auto px-6 py-12">
                {/* Back button */}
                <Link
                    to="/dashboard"
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Dashboard
                </Link>

                {/* Hero section */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl mb-6 shadow-lg">
                        <Headphones className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Create Audio Overview
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Transform any article or research paper into a podcast-style audio conversation
                        with two AI hosts discussing the key concepts.
                    </p>
                </div>

                {/* Features highlight */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                            <MessageCircle className="w-5 h-5 text-purple-600" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">Natural Conversation</h3>
                        <p className="text-sm text-gray-600">
                            Two AI hosts discuss the content naturally, making it engaging and easy to follow.
                        </p>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                            <Clock className="w-5 h-5 text-indigo-600" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">5-10 Minutes</h3>
                        <p className="text-sm text-gray-600">
                            Perfect length for commutes, workouts, or a quick learning session.
                        </p>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                            <Lightbulb className="w-5 h-5 text-pink-600" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">Key Takeaways</h3>
                        <p className="text-sm text-gray-600">
                            Get the essential insights without reading the entire document.
                        </p>
                    </div>
                </div>

                {/* URL Input form */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                    <div className="p-8">
                        <form onSubmit={handleSubmit}>
                            {/* URL Input */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Paste URL of article, research paper, or blog post
                                </label>
                                <div className="relative">
                                    <input
                                        type="url"
                                        value={url}
                                        onChange={(e) => setUrl(e.target.value)}
                                        placeholder="https://arxiv.org/abs/... or any article URL"
                                        className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl
                             text-gray-900 placeholder:text-gray-400
                             focus:outline-none focus:border-primary-500 focus:bg-white
                             transition-all text-lg"
                                        required
                                    />
                                </div>
                                <p className="mt-2 text-sm text-gray-500">
                                    Works with arXiv, Medium, Wikipedia, news articles, and most blog posts
                                </p>
                            </div>

                            {/* Advanced options toggle */}
                            <button
                                type="button"
                                onClick={() => setShowAdvanced(!showAdvanced)}
                                className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-4"
                            >
                                <Sparkles className="w-4 h-4" />
                                {showAdvanced ? 'Hide' : 'Show'} customization options
                            </button>

                            {/* Advanced options */}
                            {showAdvanced && (
                                <div className="space-y-4 mb-6 p-4 bg-gray-50 rounded-xl">
                                    {/* Target Audience */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Target Audience
                                        </label>
                                        <select
                                            value={options.targetAudience}
                                            onChange={(e) => setOptions({ ...options, targetAudience: e.target.value })}
                                            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg
                               focus:outline-none focus:ring-2 focus:ring-primary-500"
                                        >
                                            {audienceOptions.map((opt) => (
                                                <option key={opt} value={opt}>{opt}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Focus Area */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Focus Area (optional)
                                        </label>
                                        <input
                                            type="text"
                                            value={options.focusArea}
                                            onChange={(e) => setOptions({ ...options, focusArea: e.target.value })}
                                            placeholder="e.g., practical applications, theoretical concepts..."
                                            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg
                               focus:outline-none focus:ring-2 focus:ring-primary-500"
                                        />
                                    </div>

                                    {/* Duration */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Preferred Duration
                                        </label>
                                        <select
                                            value={options.duration}
                                            onChange={(e) => setOptions({ ...options, duration: e.target.value })}
                                            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg
                               focus:outline-none focus:ring-2 focus:ring-primary-500"
                                        >
                                            {durationOptions.map((opt) => (
                                                <option key={opt} value={opt}>{opt}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Tone */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Podcast Tone
                                        </label>
                                        <select
                                            value={options.tone}
                                            onChange={(e) => setOptions({ ...options, tone: e.target.value })}
                                            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg
                               focus:outline-none focus:ring-2 focus:ring-primary-500"
                                        >
                                            {toneOptions.map((opt) => (
                                                <option key={opt} value={opt}>{opt}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            )}

                            {/* Error message */}
                            {error && (
                                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                                    {error}
                                </div>
                            )}

                            {/* Submit button */}
                            <button
                                type="submit"
                                disabled={isLoading || !url}
                                className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl
                         font-semibold text-lg shadow-lg hover:shadow-xl
                         disabled:opacity-50 disabled:cursor-not-allowed
                         transition-all flex items-center justify-center gap-3
                         hover:from-purple-700 hover:to-indigo-700"
                            >
                                {isLoading ? (
                                    <>
                                        <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                                        Starting generation...
                                    </>
                                ) : (
                                    <>
                                        <Headphones className="w-5 h-5" />
                                        Generate Audio Overview
                                        <ArrowRight className="w-5 h-5" />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Info footer */}
                    <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
                        <p className="text-sm text-gray-500 text-center">
                            🎙️ Audio generation takes <strong>3-5 minutes</strong>.
                            You can generate up to <strong>3 audio overviews per day</strong>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateAudioPage;
