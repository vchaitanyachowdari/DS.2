import { useState, useRef, useEffect } from 'react';
import {
    Play, Pause, SkipBack, SkipForward, Volume2, VolumeX,
    Download, Share2, Clock, MessageSquare
} from 'lucide-react';

/**
 * AudioPlayer Component
 * A custom audio player for NotebookLM-style podcast playback
 * Features: play/pause, speed control, seek, volume, transcript view
 */
const AudioPlayer = ({
    audioUrl,
    title,
    description,
    duration,
    dialogue = [],
    onComplete
}) => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [audioDuration, setAudioDuration] = useState(0);
    const [playbackRate, setPlaybackRate] = useState(1);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [showTranscript, setShowTranscript] = useState(false);
    const [activeDialogueIndex, setActiveDialogueIndex] = useState(0);

    const playbackRates = [0.5, 0.75, 1, 1.25, 1.5, 2];

    // Update current time as audio plays
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleTimeUpdate = () => {
            setCurrentTime(audio.currentTime);
            // Update active dialogue based on estimated timing
            if (dialogue.length > 0) {
                const estimatedIndex = Math.floor(
                    (audio.currentTime / audio.duration) * dialogue.length
                );
                setActiveDialogueIndex(Math.min(estimatedIndex, dialogue.length - 1));
            }
        };

        const handleLoadedMetadata = () => {
            setAudioDuration(audio.duration);
        };

        const handleEnded = () => {
            setIsPlaying(false);
            if (onComplete) onComplete();
        };

        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audio.removeEventListener('ended', handleEnded);
        };
    }, [dialogue, onComplete]);

    // Toggle play/pause
    const togglePlay = () => {
        const audio = audioRef.current;
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    // Skip forward/backward
    const skip = (seconds) => {
        const audio = audioRef.current;
        audio.currentTime = Math.max(0, Math.min(audio.duration, audio.currentTime + seconds));
    };

    // Change playback rate
    const cyclePlaybackRate = () => {
        const currentIndex = playbackRates.indexOf(playbackRate);
        const nextIndex = (currentIndex + 1) % playbackRates.length;
        const newRate = playbackRates[nextIndex];
        setPlaybackRate(newRate);
        audioRef.current.playbackRate = newRate;
    };

    // Toggle mute
    const toggleMute = () => {
        audioRef.current.muted = !isMuted;
        setIsMuted(!isMuted);
    };

    // Handle seek
    const handleSeek = (e) => {
        const progressBar = e.currentTarget;
        const clickX = e.nativeEvent.offsetX;
        const width = progressBar.offsetWidth;
        const newTime = (clickX / width) * audioDuration;
        audioRef.current.currentTime = newTime;
    };

    // Handle volume change
    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        audioRef.current.volume = newVolume;
        setIsMuted(newVolume === 0);
    };

    // Format time display
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    // Download audio
    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = audioUrl;
        link.download = `${title.replace(/[^a-z0-9]/gi, '_')}.mp3`;
        link.click();
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            {/* Header with title */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white p-6">
                <div className="flex items-start justify-between">
                    <div>
                        <h2 className="text-xl font-bold mb-2">{title}</h2>
                        <p className="text-primary-100 text-sm line-clamp-2">{description}</p>
                    </div>
                    <div className="flex items-center gap-2 text-primary-100">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm font-medium">{duration || formatTime(audioDuration)}</span>
                    </div>
                </div>
            </div>

            {/* Audio element (hidden) */}
            <audio ref={audioRef} src={audioUrl} preload="metadata" />

            {/* Player controls */}
            <div className="p-6">
                {/* Progress bar */}
                <div
                    className="h-2 bg-gray-200 rounded-full cursor-pointer mb-4 group"
                    onClick={handleSeek}
                >
                    <div
                        className="h-full bg-primary-600 rounded-full relative transition-all"
                        style={{ width: `${(currentTime / audioDuration) * 100 || 0}%` }}
                    >
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-primary-600 rounded-full
                          opacity-0 group-hover:opacity-100 transition-opacity shadow-lg" />
                    </div>
                </div>

                {/* Time display */}
                <div className="flex justify-between text-sm text-gray-500 mb-4">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(audioDuration)}</span>
                </div>

                {/* Main controls */}
                <div className="flex items-center justify-center gap-6 mb-6">
                    {/* Skip back 10s */}
                    <button
                        onClick={() => skip(-10)}
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
                        title="Skip back 10 seconds"
                    >
                        <SkipBack className="w-6 h-6" />
                    </button>

                    {/* Play/Pause */}
                    <button
                        onClick={togglePlay}
                        className="w-16 h-16 bg-primary-600 hover:bg-primary-700 text-white rounded-full
                     flex items-center justify-center shadow-lg transition-all
                     hover:scale-105 active:scale-95"
                    >
                        {isPlaying ? (
                            <Pause className="w-7 h-7" />
                        ) : (
                            <Play className="w-7 h-7 ml-1" />
                        )}
                    </button>

                    {/* Skip forward 10s */}
                    <button
                        onClick={() => skip(10)}
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
                        title="Skip forward 10 seconds"
                    >
                        <SkipForward className="w-6 h-6" />
                    </button>
                </div>

                {/* Secondary controls */}
                <div className="flex items-center justify-between">
                    {/* Playback speed */}
                    <button
                        onClick={cyclePlaybackRate}
                        className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium
                     text-gray-700 transition-colors"
                    >
                        {playbackRate}x
                    </button>

                    {/* Volume control */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={toggleMute}
                            className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            {isMuted || volume === 0 ? (
                                <VolumeX className="w-5 h-5" />
                            ) : (
                                <Volume2 className="w-5 h-5" />
                            )}
                        </button>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={volume}
                            onChange={handleVolumeChange}
                            className="w-20 accent-primary-600"
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setShowTranscript(!showTranscript)}
                            className={`p-2 rounded-lg transition-colors ${showTranscript
                                    ? 'bg-primary-100 text-primary-600'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                }`}
                            title="Show transcript"
                        >
                            <MessageSquare className="w-5 h-5" />
                        </button>
                        <button
                            onClick={handleDownload}
                            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Download audio"
                        >
                            <Download className="w-5 h-5" />
                        </button>
                        <button
                            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Share"
                        >
                            <Share2 className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Transcript panel */}
            {showTranscript && dialogue.length > 0 && (
                <div className="border-t border-gray-200 p-6 bg-gray-50 max-h-96 overflow-y-auto">
                    <h3 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">
                        Transcript
                    </h3>
                    <div className="space-y-4">
                        {dialogue.map((turn, index) => (
                            <div
                                key={index}
                                className={`p-3 rounded-lg transition-colors ${index === activeDialogueIndex
                                        ? 'bg-primary-50 border-l-4 border-primary-500'
                                        : 'bg-white'
                                    }`}
                            >
                                <div className="flex items-center gap-2 mb-1">
                                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${turn.speaker === 'Alex'
                                            ? 'bg-blue-100 text-blue-700'
                                            : 'bg-purple-100 text-purple-700'
                                        }`}>
                                        {turn.speaker}
                                    </span>
                                    {turn.emotion && (
                                        <span className="text-xs text-gray-400 italic">{turn.emotion}</span>
                                    )}
                                </div>
                                <p className="text-gray-700 text-sm leading-relaxed">{turn.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AudioPlayer;
