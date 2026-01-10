# Student Learning Platform - Frontend Implementation Guide

Complete implementation guide for building the frontend based on the PRD requirements.

---

## 📋 Table of Contents

1. [Quick Start](#quick-start)
2. [Project Structure](#project-structure)
3. [Tech Stack](#tech-stack)
4. [Design System](#design-system)
5. [Page Breakdown](#page-breakdown)
6. [Component Library](#component-library)
7. [State Management](#state-management)
8. [API Integration](#api-integration)
9. [Routing](#routing)
10. [Deployment](#deployment)
11. [Testing](#testing)
12. [Performance](#performance)

---

## 🚀 Quick Start

### Prerequisites

```bash
node >= 18.x
npm >= 9.x
```

### Setup

```bash
# Create React app with Vite
npm create vite@latest student-learning-platform -- --template react

# Navigate to project
cd student-learning-platform

# Install dependencies
npm install

# Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Install React Router
npm install react-router-dom

# Install icons
npm install lucide-react

# Install other dependencies
npm install axios react-hook-form react-player
```

### Tailwind Configuration

```javascript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        }
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out',
        'slide-up': 'slide-up 0.3s ease-out'
      }
    },
  },
  plugins: [],
}
```

### Index CSS

```css
/* src/index.css */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply font-sans antialiased;
  }
}

@layer utilities {
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}
```

---

## 📁 Project Structure

```
student-learning-platform/
├── public/
│   ├── logo.svg
│   └── thumbnails/
├── src/
│   ├── assets/
│   │   └── images/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Badge.jsx
│   │   │   ├── Alert.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Loader.jsx
│   │   │   └── Navigation.jsx
│   │   ├── video/
│   │   │   ├── VideoCard.jsx
│   │   │   ├── VideoPlayer.jsx
│   │   │   └── VideoGrid.jsx
│   │   ├── review/
│   │   │   ├── ReviewCard.jsx
│   │   │   └── ScoreDisplay.jsx
│   │   └── layout/
│   │       ├── Header.jsx
│   │       ├── Footer.jsx
│   │       └── PageContainer.jsx
│   ├── pages/
│   │   ├── LandingPage.jsx
│   │   ├── auth/
│   │   │   ├── LoginPage.jsx
│   │   │   └── SignupPage.jsx
│   │   ├── DashboardPage.jsx
│   │   ├── CreateVideoPage.jsx
│   │   ├── VideoGenerationLoadingPage.jsx
│   │   ├── VideoPlayerPage.jsx
│   │   ├── ProjectReviewerPage.jsx
│   │   ├── ReviewResultsPage.jsx
│   │   └── ProfilePage.jsx
│   ├── services/
│   │   ├── api.js
│   │   ├── auth.js
│   │   └── storage.js
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── useVideos.js
│   │   └── useReviews.js
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── NotificationContext.jsx
│   ├── utils/
│   │   ├── validators.js
│   │   ├── formatters.js
│   │   └── constants.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env
├── .env.example
├── .gitignore
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

## 🛠 Tech Stack

### Core

- **React 18** - UI library
- **Vite** - Build tool & dev server
- **Tailwind CSS** - Styling framework
- **React Router** - Client-side routing

### Additional Libraries

- **lucide-react** - Icon library
- **axios** - HTTP client
- **react-hook-form** - Form validation
- **react-player** - Video player (for YouTube embeds)
- **react-query** (optional) - Server state management

### Development Tools

- **ESLint** - Linting
- **Prettier** - Code formatting
- **Husky** - Git hooks (optional)

---

## 🎨 Design System

Refer to `student-learning-platform-design-system.md` for complete specifications.

### Quick Reference

**Colors:**
- Primary: `#4f46e5` (Indigo)
- Success: `#059669` (Green)
- Error: `#dc2626` (Red)
- Warning: `#d97706` (Amber)

**Typography:**
- Font: Inter
- Base size: 16px
- Scale: 12px, 14px, 16px, 18px, 20px, 24px, 30px, 36px, 48px

**Spacing:**
- Base unit: 4px
- Common: 8px, 12px, 16px, 24px, 32px, 48px

**Border Radius:**
- Small: 6px (`rounded-md`)
- Medium: 8px (`rounded-lg`)
- Large: 12px (`rounded-xl`)

---

## 📄 Page Breakdown

### 1. Landing Page (`/`)

**Components:**
- Hero section with CTA
- Features overview (3 cards)
- How it works (3 steps)
- CTA section
- Footer

**State:**
- None (static content)

**Actions:**
- Navigate to signup
- Navigate to dashboard

---

### 2. Login Page (`/login`)

**Components:**
- Email/password form
- Google OAuth button
- Remember me checkbox
- Forgot password link

**State:**
- `email`, `password`, `rememberMe`, `error`, `isLoading`

**Actions:**
- Submit login
- OAuth redirect
- Navigate to signup

**API Calls:**
```javascript
POST /api/auth/login
{
  email: string,
  password: string
}

Response:
{
  token: string,
  user: {
    id, name, email
  }
}
```

---

### 3. Signup Page (`/signup`)

**Components:**
- Name, email, password, confirm password form
- Google OAuth button
- Terms checkbox

**State:**
- `formData`, `errors`, `isLoading`

**Actions:**
- Submit signup
- OAuth redirect
- Navigate to login

**API Calls:**
```javascript
POST /api/auth/register
{
  name: string,
  email: string,
  password: string
}

Response:
{
  token: string,
  user: {
    id, name, email
  }
}
```

---

### 4. Dashboard Page (`/dashboard`)

**Components:**
- Navigation bar
- Search bar
- Category tabs
- Video grid (with cards)
- Load more button

**State:**
- `activeCategory`, `searchQuery`, `videos`, `isLoading`

**Actions:**
- Search videos
- Filter by category
- Load more
- Click video card → navigate to player

**API Calls:**
```javascript
GET /api/videos?category={category}&search={query}&page={page}

Response:
{
  videos: [
    {
      id, title, description, thumbnail,
      duration, category, views, publishedAt, source
    }
  ],
  total, page, hasMore
}
```

---

### 5. Create Video Page (`/create`)

**Components:**
- URL input form
- Example URLs
- Info cards (generation time, video length, auto-save)
- Tips section

**State:**
- `url`, `isValid`, `error`, `isGenerating`

**Actions:**
- Submit URL
- Validate URL format
- Navigate to loading page

**API Calls:**
```javascript
POST /api/videos/generate
{
  url: string
}

Response:
{
  jobId: string,
  estimatedTime: number
}
```

---

### 6. Video Generation Loading Page (`/generate/:jobId`)

**Components:**
- Animated spinner/icon
- Progress steps
- Estimated time

**State:**
- `progress`, `currentStep`, `estimatedTime`

**Actions:**
- Poll job status
- Redirect to video player on completion
- Cancel generation

**API Calls:**
```javascript
GET /api/videos/generate/:jobId/status

Response:
{
  status: 'pending' | 'processing' | 'complete' | 'failed',
  currentStep: number,
  estimatedTime: number,
  videoId?: string (if complete)
}
```

---

### 7. Video Player Page (`/watch/:videoId`)

**Components:**
- Video player (YouTube embed or HTML5)
- Video title, description
- Related videos sidebar
- Bookmark/share buttons

**State:**
- `video`, `isLoading`, `relatedVideos`

**Actions:**
- Play/pause video
- Bookmark video
- Share video
- Navigate to related video

**API Calls:**
```javascript
GET /api/videos/:videoId

Response:
{
  id, title, description, url,
  duration, category, createdAt, source
}
```

---

### 8. Project Reviewer Page (`/review`)

**Components:**
- GitHub URL input form
- Info section (what we analyze)
- Stats cards
- Disclaimer

**State:**
- `repoUrl`, `isValid`, `error`, `isReviewing`

**Actions:**
- Submit GitHub URL
- Validate GitHub URL format
- Navigate to results page

**API Calls:**
```javascript
POST /api/reviews
{
  repoUrl: string
}

Response:
{
  reviewId: string,
  estimatedTime: number
}
```

---

### 9. Review Results Page (`/review/:reviewId`)

**Components:**
- Repo info header
- Quality score display
- Strengths list
- Improvements list
- Full review text
- Download PDF button

**State:**
- `review`, `isLoading`

**Actions:**
- Download PDF
- Navigate to profile reviews

**API Calls:**
```javascript
GET /api/reviews/:reviewId

Response:
{
  id, repoName, repoUrl, reviewDate,
  qualityScore, strengths[], improvements[], fullReview
}

GET /api/reviews/:reviewId/pdf
// Returns PDF file
```

---

### 10. Profile Page (`/profile`)

**Components:**
- Profile header (avatar, name, email, stats)
- Tabs (My Videos, My Reviews, Bookmarks)
- Video/review cards

**State:**
- `activeTab`, `myVideos`, `myReviews`, `bookmarks`

**Actions:**
- Switch tabs
- Delete video/review
- Edit profile (navigate to settings)

**API Calls:**
```javascript
GET /api/users/me

Response:
{
  id, name, email, joined, avatar,
  stats: {
    videosGenerated, reviewsCompleted, videosWatched
  }
}

GET /api/users/me/videos
GET /api/users/me/reviews
GET /api/users/me/bookmarks
```

---

## 🧩 Component Library

### Button Component

```jsx
// src/components/common/Button.jsx
const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  className = '',
  icon: Icon,
  ...props
}) => {
  const baseStyles = 'font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 focus:ring-primary-500',
    secondary: 'bg-white text-gray-700 border-2 border-gray-300 hover:bg-gray-50 hover:border-gray-400 focus:ring-primary-500',
    success: 'bg-success-600 text-white hover:bg-success-700 focus:ring-success-500',
    danger: 'bg-error-600 text-white hover:bg-error-700 focus:ring-error-500',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {loading ? (
        <>
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          <span>Loading...</span>
        </>
      ) : (
        <>
          {Icon && <Icon className="w-5 h-5" />}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;
```

### Input Component

```jsx
// src/components/common/Input.jsx
const Input = ({
  label,
  error,
  helperText,
  icon: Icon,
  ...props
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          className={`w-full px-4 py-3 ${Icon ? 'pl-10' : ''} bg-white border-2 rounded-lg
                   focus:outline-none placeholder:text-gray-400 transition-all
                   ${error
                     ? 'border-error-600 focus:border-error-600 focus:ring-2 focus:ring-error-500 focus:ring-opacity-20'
                     : 'border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-20'
                   }`}
          {...props}
        />
        {Icon && (
          <Icon className={`absolute left-3 top-3.5 w-5 h-5 ${error ? 'text-error-600' : 'text-gray-400'}`} />
        )}
      </div>
      {error && (
        <p className="text-sm text-error-600 flex items-center gap-1">
          <AlertCircle className="w-4 h-4" />
          {error}
        </p>
      )}
      {helperText && !error && (
        <p className="text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
};

export default Input;
```

### VideoCard Component

```jsx
// src/components/video/VideoCard.jsx
import { Play, Clock, Eye, Calendar, Bookmark } from 'lucide-react';

const VideoCard = ({ video, onClick }) => {
  const categoryColors = {
    'AI/ML': 'bg-purple-100 text-purple-700',
    'Data Science': 'bg-cyan-100 text-cyan-700',
    'Research': 'bg-pink-100 text-pink-700',
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl border border-gray-200 overflow-hidden
               hover:shadow-lg hover:border-primary-200
               transition-all duration-200 cursor-pointer group"
    >
      {/* Thumbnail */}
      <div className="aspect-video bg-gray-100 relative overflow-hidden">
        <div className="w-full h-full bg-gradient-to-br from-primary-100 to-purple-100 flex items-center justify-center">
          <Video className="w-16 h-16 text-primary-600 opacity-50" />
        </div>

        {/* Play Button */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30
                      transition-all flex items-center justify-center">
          <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center
                        opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100
                        transition-all">
            <Play className="w-6 h-6 text-primary-600 ml-0.5" />
          </div>
        </div>

        {/* Duration */}
        <div className="absolute bottom-2 right-2 px-2 py-1 bg-gray-900 bg-opacity-80
                      text-white text-xs font-semibold rounded flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {video.duration}
        </div>

        {/* Category */}
        <div className={`absolute top-2 left-2 px-3 py-1 rounded-full text-xs font-semibold ${categoryColors[video.category]}`}>
          {video.category}
        </div>

        {/* Bookmark */}
        <button className="absolute top-2 right-2 p-1.5 bg-white bg-opacity-90 rounded-full
                         opacity-0 group-hover:opacity-100 transition-opacity hover:bg-opacity-100">
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
      </div>
    </div>
  );
};

export default VideoCard;
```

---

## 🔌 API Integration

### API Client Setup

```javascript
// src/services/api.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle errors globally
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error.response?.data || error.message);
  }
);

export default {
  // Auth
  auth: {
    login: (email, password) =>
      apiClient.post('/auth/login', { email, password }),
    register: (name, email, password) =>
      apiClient.post('/auth/register', { name, email, password }),
    logout: () => {
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    },
  },

  // Videos
  videos: {
    getAll: (params) => apiClient.get('/videos', { params }),
    getById: (id) => apiClient.get(`/videos/${id}`),
    generate: (url) => apiClient.post('/videos/generate', { url }),
    getGenerationStatus: (jobId) => apiClient.get(`/videos/generate/${jobId}/status`),
  },

  // Reviews
  reviews: {
    create: (repoUrl) => apiClient.post('/reviews', { repoUrl }),
    getById: (id) => apiClient.get(`/reviews/${id}`),
    downloadPDF: (id) => apiClient.get(`/reviews/${id}/pdf`, { responseType: 'blob' }),
  },

  // User
  user: {
    getProfile: () => apiClient.get('/users/me'),
    getMyVideos: () => apiClient.get('/users/me/videos'),
    getMyReviews: () => apiClient.get('/users/me/reviews'),
  },
};
```

---

## 🧭 Routing

```jsx
// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import DashboardPage from './pages/DashboardPage';
import CreateVideoPage from './pages/CreateVideoPage';
import VideoGenerationLoadingPage from './pages/VideoGenerationLoadingPage';
import VideoPlayerPage from './pages/VideoPlayerPage';
import ProjectReviewerPage from './pages/ProjectReviewerPage';
import ReviewResultsPage from './pages/ReviewResultsPage';
import ProfilePage from './pages/ProfilePage';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('auth_token');
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/watch/:videoId" element={<VideoPlayerPage />} />

          {/* Protected Routes */}
          <Route path="/create" element={
            <ProtectedRoute>
              <CreateVideoPage />
            </ProtectedRoute>
          } />
          <Route path="/generate/:jobId" element={
            <ProtectedRoute>
              <VideoGenerationLoadingPage />
            </ProtectedRoute>
          } />
          <Route path="/review" element={
            <ProtectedRoute>
              <ProjectReviewerPage />
            </ProtectedRoute>
          } />
          <Route path="/review/:reviewId" element={
            <ProtectedRoute>
              <ReviewResultsPage />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
```

---

## 🚢 Deployment

### Environment Variables

```bash
# .env.example
VITE_API_URL=http://localhost:3000/api
VITE_GOOGLE_CLIENT_ID=your-google-oauth-client-id
```

### Build for Production

```bash
# Build
npm run build

# Preview build locally
npm run preview
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production
vercel --prod
```

### Deploy to Netlify

```bash
# Build command
npm run build

# Publish directory
dist

# Environment variables
# Add VITE_API_URL in Netlify dashboard
```

---

## ✅ Testing

### Unit Tests (Vitest)

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom
```

```javascript
// Button.test.jsx
import { render, screen } from '@testing-library/react';
import Button from './Button';

test('renders button with text', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByText('Click me')).toBeInTheDocument();
});
```

### E2E Tests (Playwright)

```bash
npm install -D @playwright/test
```

---

## ⚡ Performance Optimizations

1. **Code Splitting**: Use React.lazy() for route-based splitting
2. **Image Optimization**: Use WebP format, lazy loading
3. **Bundle Analysis**: `npm run build -- --analyze`
4. **Caching**: Service worker for offline support (PWA)
5. **CDN**: Serve static assets from CDN

---

## 📱 Mobile Responsiveness

All pages are mobile-first and responsive:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: 1024px+

Test on:
- iOS Safari
- Chrome Android
- Various screen sizes

---

## 🎯 Next Steps

1. Set up project with Vite + React
2. Install dependencies
3. Configure Tailwind CSS
4. Implement component library
5. Build pages one by one
6. Integrate with backend API
7. Add authentication flow
8. Test on mobile devices
9. Deploy to production

---

## 📚 Additional Resources

- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Router Docs](https://reactrouter.com)
- [Lucide Icons](https://lucide.dev)
- [Vite Docs](https://vitejs.dev)

---

**Ready to build! 🚀**

All design files, components, and page layouts are provided. Follow this guide to implement the complete frontend for the Student Learning Platform.
