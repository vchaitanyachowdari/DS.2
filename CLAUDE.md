# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Student Learning Platform** - an AI-powered educational platform that transforms research papers into educational videos and provides AI code reviews. The project consists of two main components:

1. **Frontend** (`student-learning-platform/`) - React + Vite + Tailwind CSS
2. **Backend** (`backend/`) - Node.js + Express + Supabase

## Commands

### Frontend (student-learning-platform/)

```bash
# Development
npm run dev          # Start dev server (Vite) on http://localhost:5173

# Build
npm run build        # Build for production
npm run preview      # Preview production build

# Linting
npm run lint         # Run ESLint
```

### Backend (backend/)

```bash
# Development
npm run dev          # Start server with nodemon on port 5000
npm run worker:dev   # Start background worker with nodemon

# Production
npm start            # Start server
npm run worker       # Start background worker

# Testing
curl http://localhost:5000/health  # Health check endpoint
```

### Prerequisites

Backend requires:
- Redis server running (for background jobs)
- Supabase project configured (database)
- Environment variables set in `backend/.env`

## Architecture

### Frontend Architecture

**Stack**: React 19 + Vite + React Router + Tailwind CSS + Lucide Icons + Axios

**Key Directories**:
- `src/components/` - Reusable UI components
  - `common/` - Button, Input, Loader, ProtectedRoute
  - `video/` - VideoCard and video-related components
- `src/pages/` - Page-level components (Dashboard, Login, Signup, CreateVideo, ProjectReview, etc.)
- `src/context/` - React context providers (AuthContext)

**Design System**:
- Uses a comprehensive design system documented in `.claude/Skills/student-learning-platform-design-system.md`
- Primary color: Indigo (#4f46e5)
- Font: Inter
- Component library with standardized buttons, inputs, cards, alerts, loading states
- Mobile-first responsive design
- WCAG 2.1 AA accessibility standards

**Routing Pattern**:
- Public routes: Landing, Login, Signup, Dashboard, Video Player
- Protected routes: Create Video, Video Generation Loading, Project Reviewer, Review Results, Profile
- Authentication via JWT tokens stored in localStorage
- `ProtectedRoute` wrapper component handles auth checks

**State Management**:
- React Context for global auth state
- Local component state with useState
- No Redux/Zustand - intentionally kept simple

### Backend Architecture

**Stack**: Express.js + Supabase (PostgreSQL) + Redis + Bull (job queue) + OpenAI + Anthropic Claude

**Key Directories**:
- `src/config/` - Database and external service configuration
- `src/controllers/` - Business logic (auth, videos, generate)
- `src/routes/` - API route definitions
- `src/middleware/` - Auth, error handling, validation
- `src/services/` - External API integrations (OpenAI, Anthropic)
- `src/jobs/` - Background job processors
- `src/utils/` - JWT utilities, helpers

**Database Schema** (Supabase/PostgreSQL):
- `users` - User accounts with bcrypt-hashed passwords
- `user_stats` - Activity tracking (videos_generated, reviews_completed, etc.)
- `videos` - Video metadata, URLs, categories
- `bookmarks` - User video bookmarks
- `reviews` - AI code review results
- `video_generation_jobs` - Job tracking for async video generation

**API Architecture**:
- RESTful API with Express
- JWT authentication middleware
- Rate limiting on all endpoints
- Helmet.js for security headers
- CORS configured for frontend URL
- Input validation with express-validator
- Centralized error handling

**Background Jobs**:
- Bull/BullMQ with Redis for job queues
- Separate worker process (`src/worker.js`)
- Video generation jobs (2-5 minute process with OpenAI)
- Code review jobs (AI analysis with Anthropic Claude)
- Job status tracking in database

**AI Integration**:
- OpenAI API - Video generation from research paper URLs
- Anthropic Claude API - Code review for GitHub repositories

## Key Features

1. **Authentication**: JWT-based with signup/login, 7-day token expiration
2. **Dashboard**: Browse curated videos with category filtering (AI/ML, Data Science, Research)
3. **Custom Video Generation**: Submit URL → AI extracts content → generates educational video (2-5 min process)
4. **Audio Overview (NotebookLM-style)**: Submit URL → AI generates dialogue script → TTS creates podcast with two hosts (Alex & Sam) → 5-10 min audio
5. **Project Reviewer**: Submit GitHub repo → AI analyzes code → provides quality score + suggestions + PDF report
6. **User Profile**: Track generated videos, reviews, bookmarks, and stats
7. **Video Management**: Search, filter, bookmark videos

### Audio Overview Feature (NEW)
Similar to Google NotebookLM's Audio Overviews:
- **Dialogue Generation**: GPT-4 creates natural conversation between two AI hosts
- **Text-to-Speech**: Edge TTS (free, high-quality Microsoft voices)
- **Audio Mixing**: FFmpeg combines voice tracks with natural pauses
- **Custom Player**: Frontend player with speed control, transcript view, download
- **Customization**: Target audience, focus area, duration, tone options

### Video Generation Feature (NEW)
Full video generation with Manim animations and TTS narration:
- **Script Generation**: AI creates slide-based video scripts with visual descriptions
- **Manim Rendering**: Automated generation of educational animations per slide
- **Narration**: Edge TTS generates voice-over for each slide
- **Audio-Video Sync**: Each slide's animation is synced to its narration duration
- **Video Concatenation**: All synced slides combined into final MP4

**Key Video Functions** (`backend/src/services/video.service.js`):
- `generateManimFile()` - Creates Manim Python script from video script
- `renderIndividualSlides()` - Renders each scene separately
- `generateSlideNarrations()` - Creates TTS audio for each slide
- `syncSlideWithAudio()` - Syncs video to audio (trims/extends)
- `generateSyncedVideo()` - Combines all synced slides into final video

**Dependencies for Video Generation**:
```bash
# Install Manim
pip install manim

# Install Edge TTS (Python)
pip install edge-tts

# Install FFmpeg (Windows - via chocolatey/scoop, or download from ffmpeg.org)
choco install ffmpeg
# or
scoop install ffmpeg

# Enable full video rendering in .env
ENABLE_VIDEO_RENDERING=true
```

## Environment Configuration

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=<google-oauth-id>
```

### Backend (.env)
```
# Required
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=<anon-key>
SUPABASE_SERVICE_KEY=<service-role-key>
JWT_SECRET=<secret-key>
FRONTEND_URL=http://localhost:5173

# Optional (for full functionality)
OPENAI_API_KEY=sk-<key>
ANTHROPIC_API_KEY=sk-ant-<key>
REDIS_URL=redis://localhost:6379

# Video/Audio Generation
ENABLE_VIDEO_RENDERING=true  # Set to 'true' for full Manim rendering, 'false' for fast mode
```

### Video Rendering Dependencies
For full video rendering (ENABLE_VIDEO_RENDERING=true):
```bash
# Python with Manim
pip install manim edge-tts

# FFmpeg (for audio/video processing)
# Windows: choco install ffmpeg OR scoop install ffmpeg
# Mac: brew install ffmpeg
# Linux: apt install ffmpeg

# Verify installation
manim --version
ffmpeg -version
python -m edge_tts --version
```

## Database Setup

Run `backend/scripts/schema.sql` in Supabase SQL Editor to create tables.
Optionally run `backend/scripts/seed-videos.sql` to populate sample videos.
For audio features, also run `backend/scripts/audio-schema.sql`.

## Design Guidelines

When working on frontend components:

1. **Always follow the design system** in `.claude/Skills/student-learning-platform-design-system.md`
2. **Color palette**: Use predefined Tailwind colors (primary-600, success-600, error-600)
3. **Component patterns**: Reference existing components in `src/components/common/`
4. **Mobile-first**: All components must be responsive (sm:, md:, lg: breakpoints)
5. **Loading states**: Always implement loading states for async operations
6. **Error handling**: Display user-friendly error messages with clear CTAs
7. **Accessibility**: Include ARIA labels, focus states, keyboard navigation

## Common Patterns

### Authentication Flow
```javascript
// Login → JWT token stored in localStorage
// Protected routes check token via ProtectedRoute component
// API calls include token in Authorization header
// Token expires after 7 days
```

### API Integration Pattern
```javascript
// Frontend makes axios request to backend
// Backend validates JWT token
// Backend queries Supabase database
// Backend returns JSON response
// Frontend updates UI state
```

### Video Generation Flow
```javascript
// 1. User submits URL via CreateVideoPage
// 2. Backend creates job in database + Redis queue
// 3. Backend returns jobId immediately
// 4. Frontend redirects to VideoGenerationLoadingPage
// 5. Frontend polls /api/generate/video/:jobId/status every 3 seconds
// 6. Worker processes job (OpenAI API calls)
// 7. On completion, frontend redirects to video player
```

## File Organization Conventions

- **Component files**: Use PascalCase (e.g., `VideoCard.jsx`, `Button.jsx`)
- **Utility files**: Use camelCase (e.g., `auth.js`, `validators.js`)
- **Route files**: Use kebab-case (e.g., `auth.routes.js`, `videos.routes.js`)
- **One component per file** in frontend
- **Controller/route separation** in backend

## Important Notes

1. **No TypeScript**: Project uses JavaScript only, no need to add types
2. **No additional state management**: Don't add Redux/Zustand, use React Context
3. **Design system is comprehensive**: Reference the existing design docs before creating new UI patterns
4. **Backend is CommonJS**: Uses `require()`, not ES6 imports
5. **Frontend is ES6 modules**: Uses `import/export`
6. **Redis is required** for video generation jobs to work
7. **API keys are optional** for development - auth/video browsing work without them

## Code Style

### Frontend
- Functional components with hooks
- Arrow functions for components
- Tailwind utility classes (no custom CSS unless necessary)
- Props destructuring in function parameters
- Explicit prop types in comments

### Backend
- Express route → controller pattern
- Async/await for all database operations
- Try-catch blocks in all controllers
- Consistent error response format: `{ success: boolean, error: string, data?: any }`
- Middleware for authentication and validation

## Testing Approach

Currently no automated tests. Manual testing via:
- Frontend: Visual inspection in browser
- Backend: cURL commands or Postman
- Health check: `GET /health` endpoint

## Deployment

Frontend: Vercel or Netlify (build: `npm run build`, output: `dist/`)
Backend: Any Node.js host (Render, Railway, Heroku) with Redis addon

## Additional Resources

- Design system: `.claude/Skills/student-learning-platform-design-system.md`
- Implementation guide: `.claude/Skills/IMPLEMENTATION-GUIDE.md`
- Frontend README: `.claude/Skills/STUDENT-PLATFORM-FRONTEND-README.md`
- Backend README: `backend/README.md`
