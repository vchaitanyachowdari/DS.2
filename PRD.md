# STUDENT LEARNING PLATFORM - PRODUCT REQUIREMENTS DOCUMENT

## CONTENTS

- Abstract
- Business Objectives
- KPI
- Success Criteria
- User Journeys
- Scenarios
- User Flow
- Functional Requirements
- Model Requirements
- Data Requirements
- Prompt Requirements
- Testing & Measurement
- Risks & Mitigations
- Costs
- Assumptions & Dependencies
- Compliance/Privacy/Legal
- GTM/Rollout Plan

---

## 📝 Abstract

An AI-powered educational platform designed for college students to quickly grasp complex research content in AI/ML and Data Science. The platform transforms lengthy research papers and technical articles into concise 5-10 minute educational videos using automated curation and generation. Students can access curated dashboard content, generate custom videos from URLs, and receive AI-powered code reviews for their GitHub projects—all built on zero-cost infrastructure to maintain accessibility.

**Core Problem Solved:** Students face information overload when trying to learn from valuable but lengthy research reports and technical content. This platform distills complex material into digestible video format, saving time and reducing cognitive overwhelm.

---

## 🎯 Business Objectives

- **Democratize access to research knowledge** by making complex academic content digestible for college students without requiring lengthy reading sessions
- **Reduce time-to-understanding** for technical content from hours of reading to 5-10 minute video consumption
- **Build automated content pipeline** that scales curation without manual intervention or high costs
- **Provide actionable feedback** on student projects through AI-powered code reviews
- **Maintain zero-cost operations** to ensure long-term sustainability and accessibility

---

## 📊 KPI

| GOAL | METRIC | QUESTION |
|------|--------|----------|
| Content Consumption | Videos watched per active user per week | Are students engaging with curated content regularly |
| Custom Generation Usage | Custom videos generated per week | Are students finding value in URL-to-video feature |
| Project Review Adoption | GitHub projects submitted per week | Are students using code review feature |
| User Retention | D7 Retention Rate | Do users return within first week |
| Content Pipeline Health | Videos published per week from curation | Is automated curation keeping pace |

**Note:** Specific numeric targets are TBD. Focus is on building and shipping functional features first.

---

## 🏆 Success Criteria

**Launch Success Definition:**
- All three core features (Dashboard, Custom Video Gen, Project Review) are live and functional on web and mobile
- Video generation pipeline produces 5-10 minute videos consistently within quality standards
- Weekly content curation publishes new dashboard videos from trusted RSS sources
- AI code reviews complete within minutes and provide actionable feedback
- Platform operates within free-tier limits of all services
- User accounts function properly with email/password and Google OAuth

**Qualitative Success:**
- Students report saving time compared to reading full papers/articles
- Generated videos are clear, educational, and maintain engagement
- Code reviews provide genuinely helpful suggestions (90%+ perceived accuracy)

---

## 🚶‍♀️ User Journeys

### Journey 1: Discovery Learner (Dashboard User)
*Sarah is a CS junior researching transformer architectures for her thesis.* She opens the app, browses the "AI/ML" category, and finds a 7-minute video summarizing a new 42-page research paper on attention mechanisms. She watches it during her commute, gains enough understanding to decide if the full paper is worth reading, and bookmarks it for later reference.

### Journey 2: Custom Content Consumer
*Michael finds a highly-cited arXiv paper his professor mentioned but dreads reading 30 pages of dense math.* He copies the URL, pastes it into the custom video generator, waits 2-3 minutes on a loading screen, and receives a 6-minute explainer video with visual diagrams and narration that covers the key contributions and methodology.

### Journey 3: Project Feedback Seeker
*Priya just finished her machine learning capstone project on GitHub.* She submits her repo link, waits a few minutes, and receives a detailed review with a code quality score (7.8/10), specific suggestions for improving model architecture, and recommendations for better documentation—all displayed on screen with a downloadable PDF report.

---

## 📖 Scenarios

**Primary Scenarios:**

1. **Browse and Watch Curated Content**
   - Student visits homepage without login
   - Browses categories (AI/ML, Data Science, AI Research Papers)
   - Clicks video thumbnail
   - Watches 5-10 min educational video
   - (Optional) Creates account to save favorites

2. **Generate Custom Video from URL**
   - Student logs in (email/password or Google)
   - Navigates to "Create Your Own Learning" section
   - Pastes URL of research paper or technical article
   - Clicks "Generate Video"
   - Waits on loading page with progress indicator
   - Watches generated video (5-10 min)
   - Video saved to "My Videos" dashboard

3. **Submit Project for AI Review**
   - Student logs in
   - Navigates to "Projects Reviewer" section
   - Pastes GitHub repository URL
   - Clicks "Review My Project"
   - Waits a few minutes (progress indicator)
   - Views results on screen: quality score, suggestions, written review
   - Downloads PDF report of review

4. **Weekly Content Discovery**
   - Student receives notification (email/in-app) about new curated videos
   - Returns to app to explore fresh content
   - Builds habit of weekly check-ins for latest research summaries

---

## 🕹️ User Flow

### High-Level Happy Path

**1. Anonymous Dashboard Access**
- Land on homepage → See featured/trending videos → Browse by category → Click video → Watch → (Prompt to create account for more features)

**2. Account Creation & Login**
- Click "Sign Up" → Choose Email/Password OR Google OAuth → Complete registration → Email verification (if email/password) → Redirect to dashboard

**3. Custom Video Generation**
- Login → Navigate to "Create Your Own Learning" → Paste URL → Click "Generate" → Loading page (2-5 min) → Video ready → Watch → Save to "My Videos"

**4. Project Review**
- Login → Navigate to "Projects Reviewer" → Paste GitHub URL → Click "Review" → Loading indicator (2-5 min) → Results page displays → Quality score + suggestions + written review → Download PDF button

**5. Content Curation (Backend Process)**
- Weekly cron job → Scrape RSS feeds from trusted sources → Filter by keywords (AI, ML, Data Science) → Generate video scripts via LLM → Produce videos via MoviePy pipeline → Upload to server/YouTube → Publish to dashboard with category tags

---

## 🧰 Functional Requirements

### Authentication & User Management

| SECTION | SUB-SECTION | USER STORY & EXPECTED BEHAVIORS | SCREENS |
|---------|-------------|----------------------------------|---------|
| Signup | Email/Password | As a student, I want to sign up with email so I can access custom features. **Behaviors:** Email validation, password strength check (min 8 chars), confirmation email sent, account created in DB. | TBD |
| Signup | Google OAuth | As a student, I want to sign up with Google for quick access. **Behaviors:** OAuth flow redirects to Google, permissions requested, account auto-created with Google profile data, redirect to dashboard. | TBD |
| Login | Email/Password | As a returning user, I want to log in with my credentials. **Behaviors:** Email/password validation, session token issued, redirect to dashboard, "Remember me" option available. | TBD |
| Login | Google OAuth | As a returning user, I want to log in with Google. **Behaviors:** OAuth flow, automatic login if Google session active, redirect to dashboard. | TBD |
| Forgot Password | | As a user, I want to reset my password if forgotten. **Behaviors:** Email input, reset link sent, link expires in 24h, new password set, confirmation message. | TBD |

### Dashboard (Public + Logged-In)

**User Story:** As a student, I want to browse and watch curated educational videos without friction so I can quickly learn about trending research topics.

**Expected Behaviors:**
- Homepage displays featured videos (most recent or trending)
- Category filters: AI/ML, Data Science, AI Research Papers
- Video thumbnails show: title, duration (5-10 min badge), publication date, source
- Click video → Opens video player (embedded YouTube or native player)
- Video player includes: play/pause, seek, speed control (1x, 1.25x, 1.5x, 2x), fullscreen
- Logged-in users see "Save to Favorites" button
- Videos load without requiring login
- Mobile-responsive grid layout

**Screens:** TBD (Homepage, Category pages, Video player page)

### Custom Video Generation

**User Story:** As a student, I want to paste a URL and get an educational video so I can understand complex content without reading lengthy articles.

**Expected Behaviors:**
- Requires login (redirect if not authenticated)
- Input field accepts URLs (validate format)
- "Generate Video" button triggers backend process
- Loading page displays:
  - Progress indicator (animated)
  - Estimated time remaining (2-5 minutes)
  - Message: "We're generating your video... This may take a few minutes"
- Backend workflow:
  - URL content extracted (text, images)
  - LLM generates script (5-10 min target)
  - Video pipeline creates video (slides + voiceover)
  - Video uploaded to storage
- On completion: Redirect to video player
- Video saved to user's "My Videos" library
- Error handling: If URL invalid or content inaccessible, show error message with suggestion to try different URL

**Screens:** TBD (Input page, Loading page, Generated video page, My Videos library)

### Project Reviewer

**User Story:** As a student, I want to submit my GitHub repo and receive AI-powered feedback so I can improve my code quality and learn best practices.

**Expected Behaviors:**
- Requires login
- Input field accepts GitHub repository URLs (validate GitHub domain)
- "Review My Project" button triggers AI review
- Loading indicator displays (2-5 minutes)
- Backend workflow:
  - Clone/fetch repo (shallow clone for speed)
  - LLM analyzes codebase: structure, quality, patterns, documentation
  - Generate quality score (0-10 scale)
  - Generate written suggestions (3-5 key improvements)
  - Generate comprehensive written review
- Results page displays:
  - Overall quality score with visual indicator (e.g., 7.8/10)
  - Key suggestions as bullet points
  - Full written review (500-1000 words)
  - "Download PDF" button
- PDF includes: repo name, review date, score, suggestions, full review, branding
- Review saved to user's "My Reviews" history
- Error handling: If repo is private/inaccessible, prompt user to make it public or provide access token (v2 feature)

**Screens:** TBD (Input page, Loading page, Results page, My Reviews history)

### User Profile & History

**User Story:** As a student, I want to access my previously generated videos and project reviews so I can refer back to them anytime.

**Expected Behaviors:**
- Profile page shows: name, email, account created date, settings
- "My Videos" tab: List of all custom-generated videos with thumbnails, titles, creation dates
- "My Reviews" tab: List of all project reviews with repo names, scores, review dates
- Click any item → Navigate to full view
- Delete option for videos/reviews
- Settings: Change password, manage notifications, delete account

**Screens:** TBD (Profile page, My Videos, My Reviews)

---

## 📐 Model Requirements

| SPECIFICATION | REQUIREMENT | RATIONALE |
|---------------|-------------|-----------|
| Open vs Proprietary | **TBD** - Will test free-tier APIs (GPT-3.5 Turbo, Claude Haiku, Gemini Flash) vs open-source (Llama 3, Mistral) | Need to balance quality with zero-cost constraint. Free-tier proprietary may offer better results but has usage limits. Open-source requires hosting but unlimited usage. |
| Context Window | **Minimum 16k tokens** for script generation, **32k+ preferred** for code review | Research papers and GitHub repos can be lengthy. Need enough context to process full documents without truncation. |
| Modalities | **Text-only** for v1 | Video generation uses text-to-image (Pexels API) and text-to-speech (gTTS) separately. Vision capabilities not needed yet. |
| Fine-Tuning Capability | **Not required for v1** | Will rely on prompt engineering and RAG patterns initially. May revisit for v2 if quality issues persist. |
| Latency | **P50: 30-60 seconds** for script generation, **P95: 2-3 minutes** for code review | Users are shown loading screens, so some latency is acceptable. Must stay under 5 minutes total to maintain engagement. |
| Parameters | **7B-13B for open-source** if self-hosting, **No preference for API calls** | Smaller models sufficient for summarization and code analysis tasks. Larger models offer diminishing returns for these use cases. |

---

## 🧮 Data Requirements

### Dashboard Content Curation

**Purpose:** Automatically populate dashboard with high-quality educational videos from trusted sources.

**Data Sources:**
- RSS feeds from trusted publications:
  - arXiv.org (AI/ML/CS categories)
  - Papers with Code
  - Towards Data Science (Medium)
  - Google AI Blog
  - OpenAI Research Blog
  - DeepMind Blog
  - MIT News (AI section)

**Data Collection Plan:**
- Weekly scraping via RSS parser (feedparser library in Python)
- Extract: title, URL, publication date, abstract/summary, author
- Filter by keywords: machine learning, deep learning, neural networks, transformer, LLM, computer vision, NLP, data science, AI research
- Store in database with status: pending_review → script_generated → video_produced → published

**Quantity Targets:**
- Minimum 5-10 new videos per week per category
- Maintain library of 100+ videos within first 3 months

**Quality Control:**
- Keyword matching ensures relevance
- Manual spot-checks during beta phase
- User feedback mechanism (thumbs up/down on videos)

**Ongoing Collection:**
- Automated weekly cron job
- Monitor RSS feed health (alerting if scraping fails)
- Expand source list based on user requests and content gaps

### Custom Video Generation

**Purpose:** Process user-submitted URLs into video scripts.

**Data Handling:**
- URL content extraction using BeautifulSoup or Newspaper3k
- Text cleaning: remove ads, navigation, footers
- Extract main content: title, body text, images (optional for v2)
- Pass cleaned text to LLM for script generation

**User Data:**
- Store: user_id, URL submitted, video_id, generation timestamp
- Retention: Indefinite unless user deletes
- No PII stored beyond email for account management

### Project Review

**Purpose:** Analyze GitHub repositories and generate code quality feedback.

**Data Collection:**
- GitHub API or git clone (shallow) to fetch repo contents
- Extract: file structure, code files (.py, .js, .java, etc.), README, requirements/package files
- Exclude: node_modules, .git, binary files, large datasets

**Analysis Input to LLM:**
- Code structure summary
- Key code snippets (if repo is large, sample representative files)
- Documentation presence/quality
- Dependency management

**User Data:**
- Store: user_id, repo_url, review_id, timestamp, score, suggestions
- Retention: Indefinite unless user deletes
- No code stored permanently—only analysis results

---

## 💬 Prompt Requirements

### Video Script Generation Prompt

**Policy & Refusal:**
- Refuse to generate content for non-educational URLs (e.g., social media posts, entertainment, ads)
- Refuse URLs containing adult content, hate speech, or harmful material
- If URL is inaccessible or content is insufficient, return error message: "Unable to generate video from this URL. Please try a research paper, technical article, or educational blog post."

**Personalization:**
- Tone: Friendly, accessible, educational (avoid academic jargon unless necessary)
- Target audience: College students with basic CS/data science knowledge
- Length: Script should be for 5-10 minute video (approximately 750-1500 words at typical speaking pace)

**Output Format:**
- JSON schema required:
```json
{
  "title": "string",
  "script": [
    {
      "slide_number": int,
      "heading": "string",
      "narration": "string",
      "visual_description": "string (optional)"
    }
  ],
  "duration_estimate": "string (e.g., '6 minutes')"
}
```

**Accuracy Target:**
- Script must accurately represent source material (no hallucinations)
- Simplify complex concepts but maintain technical correctness
- Include key findings, methodology, and implications
- Acceptable error rate: <5% factual inaccuracies (measured via spot-checks during testing)

### Code Review Prompt

**Policy & Refusal:**
- Refuse to review repos containing malicious code, exploits, or illegal content
- If repo is predominantly non-code (documentation only, assets), return: "This repository doesn't contain enough code to review."

**Personalization:**
- Tone: Constructive, encouraging, educational
- Assume student-level code (be kind but honest)
- Focus on learning opportunities, not harsh criticism

**Output Format:**
- JSON schema required:
```json
{
  "quality_score": float (0-10),
  "key_suggestions": ["string", "string", "string"],
  "full_review": "string (500-1000 words)",
  "strengths": ["string", "string"],
  "areas_for_improvement": ["string", "string"]
}
```

**Accuracy Target:**
- 90% of reviews should be perceived as helpful by users (measured via feedback thumbs up/down)
- Suggestions should be actionable and specific (not generic advice)
- Score should correlate with code quality (consistent scoring rubric in prompt)

---

## 🧪 Testing & Measurement

### Offline Evaluation Plan

**Video Script Generation:**
- Golden set: 20 diverse URLs (research papers, blog posts, technical docs)
- Manual review of generated scripts by team
- Rubric: Accuracy (40%), Clarity (30%), Length appropriateness (20%), Engagement (10%)
- Pass threshold: 7/10 average score across golden set
- Re-test after prompt changes

**Code Review:**
- Golden set: 15 GitHub repos of varying quality (student projects, open-source, intentionally flawed code)
- Manual review of AI-generated reviews
- Rubric: Accuracy of score (40%), Helpfulness of suggestions (40%), Tone appropriateness (20%)
- Pass threshold: 8/10 average score
- Include 3 edge cases (empty repo, non-code repo, very large repo)

### Online Evaluation Plan

**A/B Testing (Post-Launch):**
- Not applicable for v1 (focus on shipping)
- v2 can test prompt variations or model choices

**Guardrails:**
- Video generation timeout: 10 minutes max (fail gracefully with error message)
- Code review timeout: 10 minutes max
- Rate limiting: Max 5 custom video generations per user per day (prevent abuse of free tier)
- Rate limiting: Max 3 project reviews per user per day

**Rollback Plan:**
- If error rate >20% for video generation, pause feature and display maintenance message
- If LLM API is down, queue requests and process when service resumes
- Maintain fallback message: "Service temporarily unavailable. Your request has been saved and will be processed shortly."

### Live Performance Tracking

**Metrics to Monitor:**
- Video generation success rate (target: >80%)
- Average generation time (target: <5 min)
- Code review success rate (target: >80%)
- Average review time (target: <5 min)
- API error rates (target: <5%)
- User feedback scores (thumbs up/down on videos and reviews)

**Alerting:**
- Slack/email alert if success rate drops below 70% for >1 hour
- Alert if average generation time exceeds 10 minutes
- Alert if weekly curation job fails

---

## ⚠️ Risks & Mitigations

| RISK | MITIGATION |
|------|-----------|
| **Video generation pipeline breaks under load** | Implement queue system with background workers (Celery + Redis). Graceful degradation: show "high demand" message with estimated wait time. Monitor queue depth and scale workers if needed (within free-tier limits). |
| **AI code reviews are inaccurate or unhelpful (10% failure rate)** | Include feedback mechanism (thumbs up/down) on every review. Use feedback to refine prompts iteratively. Display disclaimer: "AI-generated review—use as learning guide, not definitive assessment." Collect golden set of bad reviews to improve prompt. |
| **Videos exceed 10 minutes or become boring** | Enforce strict word count in script generation prompt (750-1500 words). Test with golden set to validate length. Include "engagement score" in internal testing rubric. Add video speed controls (1.25x, 1.5x, 2x) so users can adjust pace. |
| **Weekly content curation can't keep up with demand** | Start with conservative targets (5-10 videos/week). Monitor user viewing patterns to identify most popular categories. Prioritize those categories in curation. If demand exceeds supply, add more RSS sources or increase curation frequency. |
| **Free-tier API limits are hit, costs spiral** | Implement hard rate limits per user (5 videos, 3 reviews per day). Monitor API usage daily via dashboards. If approaching limits, introduce waitlist or "premium" tier (future monetization). Cache LLM responses where possible (e.g., same URL submitted multiple times). Use open-source models if proprietary APIs become unsustainable. |
| **Scraped RSS content violates copyright or terms of service** | Only scrape publicly available RSS feeds designed for syndication. Generate original scripts and videos (transformative use). Include source attribution in video descriptions. Provide "Report Content" button for DMCA or removal requests. Consult legal resource (e.g., university legal aid) if concerns arise. |
| **Users submit malicious GitHub repos (malware, exploits)** | Scan repo for known malware signatures before analysis. Run code review in sandboxed environment (no code execution). Display warning if suspicious patterns detected. Include ToS clause prohibiting malicious submissions. |
| **Mobile experience is poor (loading pages, video playback)** | Design mobile-first responsive UI. Test on multiple devices (iOS/Android, various screen sizes). Use adaptive video streaming (if using YouTube, this is handled automatically). Optimize loading page animations for mobile performance. |

---

## 💰 Costs

### Development Costs

**Initial Build (Estimated Time Investment):**
- Backend API development: 40-60 hours
- Frontend (Web): 40-60 hours
- Frontend (Mobile - React Native or PWA): 30-40 hours
- Video generation pipeline integration: 20-30 hours (leveraging existing code)
- LLM integration (script gen + code review): 20-30 hours
- Authentication system: 10-15 hours
- Database design & setup: 10-15 hours
- Testing & QA: 20-30 hours
- **Total: ~190-270 hours**

**Tooling Costs (Zero-Cost Target):**
- LLM API: Free tier (GPT-3.5 Turbo, Claude Haiku, or Gemini Flash) or self-hosted open-source
- Video storage: YouTube (free unlimited public uploads) or AWS S3 free tier (5GB)
- Database: PostgreSQL (self-hosted) or Supabase free tier
- Hosting: Vercel/Netlify (free tier) or Heroku free tier (backend)
- Authentication: Firebase Auth free tier or Auth0 free tier
- RSS scraping: Python scripts (self-hosted, no cost)
- **Total Development Costs: $0 (time investment only)**

### Operational Costs (Ongoing)

**Per Month (Estimated):**
- **LLM API calls:**
  - Assumptions: 100 custom videos/week + 50 code reviews/week + 10 scripts for curation/week
  - Tokens per request: ~5k input + 2k output for scripts, ~10k input + 3k output for code reviews
  - Free tier limits: GPT-3.5 Turbo (no free tier, $0.002/1k tokens), Claude Haiku ($0.25/1M tokens), Gemini Flash (free up to 15 RPM)
  - **Target: $0 via Gemini Flash free tier or self-hosted Llama 3**
  - If exceeds free tier: ~$10-30/month on Claude Haiku

- **Video Storage:**
  - YouTube: $0 (unlimited public uploads)
  - Or S3 free tier: 5GB storage, 20k GET requests, 2k PUT requests (likely sufficient for v1)

- **Hosting:**
  - Vercel/Netlify: $0 (hobby tier, sufficient for moderate traffic)
  - Backend API: Render free tier or Railway free tier

- **Database:**
  - Supabase free tier: 500MB storage, sufficient for v1
  - Or self-hosted PostgreSQL: $0

- **Text-to-Speech (gTTS):** $0 (open-source, no API costs)

- **Image API (Pexels):** $0 (free tier, rate-limited but sufficient)

**Total Operational Costs: Target $0/month, worst case $10-30/month if free tiers exceeded**

**Scaling Considerations:**
- If user base grows beyond free tiers, introduce optional "Premium" tier ($5-10/month) for unlimited generations
- Or implement sponsorships/ads on dashboard videos (non-intrusive)
- Open-source model self-hosting becomes cost-effective at higher scale (one-time GPU cost vs ongoing API fees)

---

## 🔗 Assumptions & Dependencies

### Assumptions

1. **Video format preference:** Students prefer 5-10 minute videos over reading lengthy papers (validate with user feedback in beta)
2. **Educational content definition:** Users will primarily submit academic papers, technical blogs, and research articles—not entertainment or social media content
3. **Code review accuracy:** 90% accuracy (9 out of 10 helpful reviews) is sufficient for v1; users understand it's AI-generated guidance
4. **Async generation acceptable:** Students are willing to wait 2-5 minutes on a loading page rather than receiving email notifications
5. **Public dashboard access:** Allowing anonymous viewing of curated videos will drive signups for custom features
6. **Mobile = Responsive Web:** Initial "mobile" support can be responsive web design rather than native iOS/Android apps (PWA approach)
7. **GitHub public repos:** Users will submit public repositories; private repo access is v2 feature
8. **Weekly curation sufficient:** Publishing 5-10 new videos per week meets demand for v1 (adjust based on usage patterns)
9. **No content moderation needed initially:** Trusted RSS sources provide safe content; user-submitted URLs will be spot-checked manually in early phase
10. **Free-tier APIs sustainable:** Usage will stay within free tier limits through rate limiting and user caps

### Dependencies

**External Services:**
- LLM API availability (Gemini Flash, Claude, or GPT-3.5)
- YouTube or S3 for video hosting
- Pexels API for stock images
- Google OAuth for authentication
- GitHub API for repo access (public repos only)
- RSS feed stability from trusted sources

**Technical Dependencies:**
- Existing video generation pipeline (MoviePy, gTTS, Pillow) remains functional
- Python backend framework (FastAPI or Flask)
- Frontend framework (React for web, React Native or PWA for mobile)
- Database (PostgreSQL or Supabase)
- Job queue system for async processing (Celery + Redis or similar)

**Team/Resource Dependencies:**
- Developer time available for 190-270 hour build
- Access to test users (college students) for beta feedback
- Ability to iterate on prompts based on quality testing

**Legal/Compliance:**
- Fair use of RSS content for educational video generation (assumed acceptable under transformative use, but consult legal if scaling)
- User agreement to make GitHub repos public for review
- No student data privacy regulations apply (no FERPA/COPPA requirements confirmed)

---

## 🔒 Compliance/Privacy/Legal

### Data Governance

**Personal Data Collected:**
- Email address (for authentication)
- Name (optional, from Google OAuth)
- Password (hashed, never stored in plaintext)
- User-generated content: URLs submitted, GitHub repo links

**Data Retention:**
- User accounts: Retained indefinitely until user requests deletion
- Generated videos: Stored indefinitely, deleted upon user request
- Project reviews: Stored indefinitely, deleted upon user request
- Analytics data (page views, feature usage): Retained for 90 days

**Data Access Controls:**
- Users can only access their own generated videos and reviews
- Admin access to database limited to core team
- No third-party data sharing (except via public APIs like YouTube if videos are public)

**User Rights:**
- Right to access: Users can view all their data via profile page
- Right to deletion: "Delete Account" option removes all personal data within 30 days
- Right to export: "Download My Data" button provides JSON export of all user content (v2 feature)

### Regulatory Compliance

**GDPR (if serving EU users in future):**
- Cookie consent banner required (not needed for v1 if US-only)
- Privacy policy must detail data collection and usage
- Data processing agreements with any third-party services (e.g., Google OAuth)

**COPPA (Children's Online Privacy Protection Act):**
- Not applicable if minimum age is 13+ (enforce in ToS)
- If allowing younger users, parental consent required

**DMCA (Digital Millennium Copyright Act):**
- Provide "Report Content" mechanism for copyright infringement claims
- Designate DMCA agent for takedown requests
- Include attribution to original sources in generated video descriptions

**Terms of Service:**
- Users agree not to submit copyrighted content they don't have rights to
- Users agree not to submit malicious code for review
- Disclaimer: AI-generated content is for educational purposes, not professional advice
- Limitation of liability for inaccurate AI reviews or video content

### Security

- HTTPS enforced for all connections
- Passwords hashed using bcrypt or Argon2
- Session tokens with expiration (24-hour default)
- Rate limiting to prevent abuse (5 videos, 3 reviews per day per user)
- Input validation on all user-submitted URLs and GitHub links
- Sandboxed environment for code review (no code execution)

**Privacy Policy (Required):**
- Must be published before launch
- Detail what data is collected, how it's used, and user rights
- Link in footer and during signup

---

## 📣 GTM/Rollout Plan

### Milestones

**Phase 1: MVP Build (Weeks 1-8)**
- Week 1-2: Backend API setup (auth, database, job queue)
- Week 3-4: Frontend web development (dashboard, custom video, project review pages)
- Week 5-6: Video generation pipeline integration + LLM integration
- Week 7: Mobile responsive design + PWA setup
- Week 8: Testing, bug fixes, golden set evaluation

**Phase 2: Closed Beta (Weeks 9-10)**
- Invite 20-30 college students (personal network, CS student groups)
- Gather feedback on usability, video quality, review helpfulness
- Iterate on prompts and UI based on feedback
- Monitor for technical issues (API limits, generation failures)

**Phase 3: Open Beta (Weeks 11-12)**
- Launch publicly with "Beta" label
- Promote in college subreddits, Discord servers, CS student communities
- Monitor usage metrics and error rates
- Implement feedback loop (in-app surveys, thumbs up/down)

**Phase 4: Full Launch (Week 13+)**
- Remove "Beta" label
- Publish launch post on Product Hunt, Hacker News, relevant subreddits
- Reach out to CS professors and TAs for potential course integration
- Continue weekly content curation and feature iteration

### Launch Strategy

**Target Audience:**
- Primary: College students in CS, Data Science, AI/ML programs
- Secondary: Self-learners, bootcamp students, early-career developers

**Positioning:**
- "Turn research papers into 5-minute videos"
- "Your AI-powered learning companion for complex technical content"
- "Free, fast, and built for students"

**Launch Channels:**
- Product Hunt launch post
- Reddit: r/learnmachinelearning, r/datascience, r/computerscience, r/learnprogramming
- Twitter/X: Tech and AI communities, student influencers
- College CS departments: Email professors and student orgs
- Discord: Join study/learning communities and share (no spam, genuine contribution)

**Content Marketing:**
- Blog post: "How we built a zero-cost AI learning platform for students"
- Demo video: 60-second walkthrough of all three features
- Testimonials from beta users
