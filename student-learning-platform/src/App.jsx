import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';

// Pages
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import BookmarksPage from './pages/BookmarksPage';
import CreateVideoPage from './pages/CreateVideoPage';
import VideoGenerationLoadingPage from './pages/VideoGenerationLoadingPage';
import ProjectReviewPage from './pages/ProjectReviewPage';
import ReviewResultsPage from './pages/ReviewResultsPage';
import VideoPlayerPage from './pages/VideoPlayerPage';

// Audio Pages (NotebookLM-style)
import CreateAudioPage from './pages/CreateAudioPage';
import AudioGenerationLoadingPage from './pages/AudioGenerationLoadingPage';
import AudioPlayerPage from './pages/AudioPlayerPage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />

          {/* Bookmarks Route */}
          <Route
            path="/bookmarks"
            element={
              <ProtectedRoute>
                <BookmarksPage />
              </ProtectedRoute>
            }
          />

          {/* Create Video Routes */}
          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <CreateVideoPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create/generating"
            element={
              <ProtectedRoute>
                <VideoGenerationLoadingPage />
              </ProtectedRoute>
            }
          />

          {/* Video Player Route */}
          <Route path="/video/:id" element={<VideoPlayerPage />} />

          {/* Audio Overview Routes (NotebookLM-style) */}
          <Route
            path="/audio/create"
            element={
              <ProtectedRoute>
                <CreateAudioPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/audio/generating"
            element={
              <ProtectedRoute>
                <AudioGenerationLoadingPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/audio/player"
            element={
              <ProtectedRoute>
                <AudioPlayerPage />
              </ProtectedRoute>
            }
          />

          {/* Project Review Routes */}
          <Route
            path="/review"
            element={
              <ProtectedRoute>
                <ProjectReviewPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/review/results"
            element={
              <ProtectedRoute>
                <ReviewResultsPage />
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
