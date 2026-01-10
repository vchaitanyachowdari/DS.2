import { useLocation, useNavigate, Link } from 'react-router-dom';
import { GraduationCap, ArrowLeft, ExternalLink, Tag, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AudioPlayer from '../components/audio/AudioPlayer';

/**
 * AudioPlayerPage
 * Displays the generated audio overview with player and details
 */
const AudioPlayerPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const audio = location.state?.audio;

    // Redirect if no audio data
    if (!audio) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-600 mb-4">No audio data found</p>
                    <Link
                        to="/audio/create"
                        className="px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
                    >
                        Create Audio Overview
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
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
                            <Link to="/audio/create" className="text-base font-medium text-primary-600 border-b-2 border-primary-600 pb-1">
                                Audio Overview
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

            <div className="max-w-4xl mx-auto px-6 py-8">
                {/* Back button */}
                <Link
                    to="/dashboard"
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Dashboard
                </Link>

                {/* Audio Player */}
                <AudioPlayer
                    audioUrl={audio.audioUrl || audio.audio_url}
                    title={audio.title}
                    description={audio.description}
                    duration={audio.duration_formatted || audio.duration}
                    dialogue={audio.dialogue || []}
                />

                {/* Additional info cards */}
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                    {/* Source info */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <ExternalLink className="w-5 h-5 text-primary-600" />
                            Source
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">{audio.source_title || audio.sourceTitle}</p>
                        <a
                            href={audio.source_url || audio.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-primary-600 hover:underline break-all"
                        >
                            {audio.source_url || audio.sourceUrl}
                        </a>
                    </div>

                    {/* Topics */}
                    {(audio.topics?.length > 0 || audio.key_takeaways?.length > 0) && (
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <Tag className="w-5 h-5 text-primary-600" />
                                Topics Covered
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {(audio.topics || []).map((topic, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full"
                                    >
                                        {topic}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Key Takeaways */}
                {(audio.key_takeaways?.length > 0 || audio.keyTakeaways?.length > 0) && (
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mt-6">
                        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-primary-600" />
                            Key Takeaways
                        </h3>
                        <ul className="space-y-3">
                            {(audio.key_takeaways || audio.keyTakeaways || []).map((takeaway, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <span className="w-6 h-6 bg-gradient-to-br from-purple-500 to-indigo-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                                        {index + 1}
                                    </span>
                                    <span className="text-gray-700">{takeaway}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Create another */}
                <div className="mt-8 text-center">
                    <Link
                        to="/audio/create"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
                    >
                        Create Another Audio Overview
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AudioPlayerPage;
