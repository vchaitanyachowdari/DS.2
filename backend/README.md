# Student Learning Platform - Backend API

Backend API for the Student Learning Platform built with Node.js, Express, and Supabase.

## Features

- **Authentication**: JWT-based authentication with signup, login, and session management
- **Video Management**: CRUD operations for educational videos with search and filtering
- **Video Generation**: AI-powered video generation from URLs using OpenAI
- **Code Review**: AI-powered code review for GitHub repositories using Claude
- **Background Jobs**: Queue-based processing for long-running tasks using Bull/Redis

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: Supabase (PostgreSQL)
- **Authentication**: JWT + bcryptjs
- **AI Integration**: OpenAI API, Anthropic Claude API
- **Queue**: Bull + Redis
- **Validation**: express-validator
- **Security**: Helmet, CORS, rate limiting

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Redis** (for background jobs)
- **Supabase account** (free tier is fine)
- **OpenAI API key** (optional, for video generation)
- **Anthropic API key** (optional, for code review)

## Installation

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup

Copy the `.env.example` file to `.env`:

```bash
cp .env.example .env
```

Then update the `.env` file with your actual credentials:

```env
# Server Configuration
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:5175

# Supabase Configuration (REQUIRED)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_KEY=your-service-role-key-here

# JWT Configuration (REQUIRED)
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=7d

# OpenAI API (Optional - for video generation)
OPENAI_API_KEY=sk-your-openai-api-key-here

# Anthropic Claude API (Optional - for code review)
ANTHROPIC_API_KEY=sk-ant-your-anthropic-api-key-here

# Redis Configuration (Optional - for background jobs)
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_URL=redis://localhost:6379
```

### 3. Set Up Supabase Database

1. **Create a Supabase project**:
   - Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
   - Click "New Project"
   - Name your project and set a database password
   - Wait for the project to be created

2. **Get your credentials**:
   - Go to Project Settings > API
   - Copy the `Project URL` to `SUPABASE_URL`
   - Copy the `anon public` key to `SUPABASE_ANON_KEY`
   - Copy the `service_role` key to `SUPABASE_SERVICE_KEY`

3. **Create database tables**:
   - Go to SQL Editor in Supabase dashboard
   - Copy and paste the SQL schema from below
   - Click "Run"

#### Database Schema

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  avatar VARCHAR(10),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- User stats
CREATE TABLE user_stats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  videos_generated INT DEFAULT 0,
  reviews_completed INT DEFAULT 0,
  videos_watched INT DEFAULT 0,
  bookmarks_count INT DEFAULT 0,
  UNIQUE(user_id)
);

-- Videos table
CREATE TABLE videos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(500) NOT NULL,
  description TEXT,
  thumbnail VARCHAR(500),
  video_url VARCHAR(500) NOT NULL,
  duration VARCHAR(20),
  category VARCHAR(50) NOT NULL,
  views INT DEFAULT 0,
  published_at TIMESTAMP DEFAULT NOW(),
  source VARCHAR(100),
  source_url VARCHAR(500),
  transcript TEXT,
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  is_generated BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Bookmarks table
CREATE TABLE bookmarks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  video_id UUID REFERENCES videos(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, video_id)
);

-- Indexes for performance
CREATE INDEX idx_videos_category ON videos(category);
CREATE INDEX idx_videos_created_by ON videos(created_by);
CREATE INDEX idx_bookmarks_user ON bookmarks(user_id);

-- Function to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_videos_updated_at BEFORE UPDATE ON videos
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### 4. Install and Start Redis (Optional - for background jobs)

**On Windows:**
```bash
# Download Redis for Windows from https://github.com/microsoftarchive/redis/releases
# Or use Docker:
docker run -d -p 6379:6379 redis:latest
```

**On macOS:**
```bash
brew install redis
brew services start redis
```

**On Linux:**
```bash
sudo apt-get install redis-server
sudo service redis-server start
```

## Running the Server

### Development Mode (with auto-restart)

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

The server will start on `http://localhost:5000` by default.

## API Endpoints

### Authentication

| Method | Endpoint           | Description                | Auth Required |
|--------|-------------------|----------------------------|---------------|
| POST   | `/api/auth/signup` | Register a new user        | No            |
| POST   | `/api/auth/login`  | Login and get JWT token    | No            |
| GET    | `/api/auth/me`     | Get current user details   | Yes           |
| POST   | `/api/auth/logout` | Logout (client-side)       | No            |

### Video Management (Coming Soon)

| Method | Endpoint                      | Description                |
|--------|------------------------------|----------------------------|
| GET    | `/api/videos`                 | Get all videos             |
| GET    | `/api/videos/search?q=query`  | Search videos              |
| GET    | `/api/videos/my-videos`       | Get user's videos          |
| GET    | `/api/videos/bookmarks`       | Get bookmarked videos      |
| POST   | `/api/videos/:id/bookmark`    | Bookmark a video           |
| DELETE | `/api/videos/:id/bookmark`    | Remove bookmark            |

### Video Generation (Coming Soon)

| Method | Endpoint                              | Description              |
|--------|--------------------------------------|--------------------------|
| POST   | `/api/videos/generate`                | Start video generation   |
| GET    | `/api/videos/generate/:jobId/status`  | Check generation status  |

## Testing the API

### Using cURL

**Signup:**
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Get Current User:**
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Using Postman

1. Import the API endpoints
2. Set base URL to `http://localhost:5000`
3. For protected routes, add Authorization header: `Bearer YOUR_JWT_TOKEN`

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.js          # Supabase configuration
│   ├── controllers/
│   │   └── auth.controller.js   # Authentication logic
│   ├── middleware/
│   │   ├── auth.js              # JWT verification middleware
│   │   └── errorHandler.js      # Global error handler
│   ├── routes/
│   │   └── auth.routes.js       # Authentication routes
│   ├── utils/
│   │   └── jwt.js               # JWT utilities
│   └── server.js                # Main server file
├── .env                         # Environment variables
├── .env.example                 # Environment template
├── package.json                 # Dependencies
└── README.md                    # This file
```

## Environment Variables

| Variable              | Required | Description                          |
|-----------------------|----------|--------------------------------------|
| NODE_ENV              | No       | Environment (development/production) |
| PORT                  | No       | Server port (default: 5000)          |
| FRONTEND_URL          | Yes      | Frontend URL for CORS                |
| SUPABASE_URL          | Yes      | Supabase project URL                 |
| SUPABASE_ANON_KEY     | Yes      | Supabase anon key                    |
| SUPABASE_SERVICE_KEY  | Yes      | Supabase service role key            |
| JWT_SECRET            | Yes      | Secret key for JWT signing           |
| JWT_EXPIRES_IN        | No       | Token expiration (default: 7d)       |
| OPENAI_API_KEY        | No       | OpenAI API key (for video gen)       |
| ANTHROPIC_API_KEY     | No       | Anthropic API key (for reviews)      |
| REDIS_URL             | No       | Redis connection URL                 |

## Security

- Passwords are hashed using bcryptjs with 10 salt rounds
- JWT tokens are signed with a secret key
- Protected routes require valid JWT token in Authorization header
- Input validation using express-validator
- Helmet.js for security headers
- CORS configured for frontend URL only
- Rate limiting on all endpoints

## Error Handling

All errors return a consistent JSON format:

```json
{
  "success": false,
  "error": "Error message here",
  "details": "Additional details (in development mode only)"
}
```

## Development

### Adding New Routes

1. Create a controller in `src/controllers/`
2. Create routes in `src/routes/`
3. Import and use routes in `src/server.js`

### Adding Validation

Use express-validator in your routes:

```javascript
const { body } = require('express-validator');

router.post('/endpoint',
  [
    body('field').notEmpty().withMessage('Field is required')
  ],
  controllerFunction
);
```

## Next Steps

1. ✅ Set up Supabase database (create tables)
2. ✅ Test authentication endpoints
3. 🔄 Implement video management endpoints
4. 🔄 Implement video generation with OpenAI
5. 🔄 Seed initial video data
6. 🔄 Connect frontend to backend
7. 🔄 Deploy to production

## Troubleshooting

### Database Connection Error

- Verify Supabase credentials in `.env`
- Check if database tables are created
- Ensure Supabase project is active

### JWT Token Error

- Ensure JWT_SECRET is set in `.env`
- Check token format: `Bearer <token>`
- Verify token hasn't expired

### Redis Connection Error

- Install and start Redis server
- Check Redis URL in `.env`
- For development, Redis is optional

## License

ISC

## Support

For issues or questions, please open an issue on GitHub.
