# Student Learning Platform - Design System

## Design Philosophy

A modern, accessible educational platform that transforms complex research content into digestible learning experiences. The design prioritizes:

- **Clarity**: Information hierarchy that guides learning
- **Engagement**: Interactive elements that encourage exploration
- **Trust**: Professional appearance that builds confidence in AI-generated content
- **Accessibility**: WCAG 2.1 AA compliant for all learners

---

## Color Palette

### Primary Colors

```css
/* Brand Colors */
--primary-600: #4f46e5;        /* Indigo - Primary actions, links */
--primary-700: #4338ca;        /* Indigo dark - Hover states */
--primary-50: #eef2ff;         /* Indigo lightest - Backgrounds */

/* Neutral Colors */
--gray-900: #111827;           /* Headings, primary text */
--gray-700: #374151;           /* Body text */
--gray-500: #6b7280;           /* Secondary text */
--gray-300: #d1d5db;           /* Borders */
--gray-100: #f3f4f6;           /* Backgrounds */
--gray-50: #f9fafb;            /* Subtle backgrounds */

/* Background */
--white: #ffffff;              /* Main background */
```

### Semantic Colors

```css
/* Success - Video generation complete, positive feedback */
--success-600: #059669;
--success-50: #d1fae5;

/* Warning - Loading states, attention needed */
--warning-600: #d97706;
--warning-50: #fef3c7;

/* Error - Failed generations, form errors */
--error-600: #dc2626;
--error-50: #fee2e2;

/* Info - Educational tips, helper text */
--info-600: #2563eb;
--info-50: #dbeafe;
```

### Category Colors (for content categorization)

```css
--category-ai-ml: #8b5cf6;           /* Purple - AI/ML */
--category-data-science: #06b6d4;    /* Cyan - Data Science */
--category-research: #ec4899;        /* Pink - Research Papers */
```

---

## Typography

### Font Family

```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI',
             'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
```

**Why Inter?** Excellent screen readability, modern aesthetic, supports extensive weights, free and open-source.

### Type Scale

```css
/* Display (Hero sections) */
H1 Display: text-5xl (48px), font-bold (700), line-height: 1.1, letter-spacing: -0.02em
H1: text-4xl (36px), font-bold (700), line-height: 1.2

/* Headings */
H2: text-3xl (30px), font-semibold (600), line-height: 1.3
H3: text-2xl (24px), font-semibold (600), line-height: 1.4
H4: text-xl (20px), font-semibold (600), line-height: 1.5
H5: text-lg (18px), font-medium (500), line-height: 1.5

/* Body */
Body Large: text-lg (18px), font-normal (400), line-height: 1.7
Body: text-base (16px), font-normal (400), line-height: 1.6
Body Small: text-sm (14px), font-normal (400), line-height: 1.5

/* UI Elements */
Caption: text-xs (12px), font-medium (500), line-height: 1.4, uppercase, letter-spacing: 0.05em
Button: text-base (16px), font-medium (500), letter-spacing: 0.01em
Badge: text-xs (12px), font-semibold (600)
```

### Tailwind Classes

```jsx
// Headings
<h1 className="text-4xl font-bold text-gray-900">
<h2 className="text-3xl font-semibold text-gray-900">
<h3 className="text-2xl font-semibold text-gray-800">

// Body
<p className="text-base text-gray-700 leading-relaxed">
<span className="text-sm text-gray-500">

// Links
<a className="text-primary-600 hover:text-primary-700 font-medium">
```

---

## Spacing System

Base unit: **4px** (Tailwind's default spacing scale)

### Common Spacing

```css
Extra Tight:  8px  (space-y-2, gap-2)
Tight:        12px (space-y-3, gap-3)
Normal:       16px (space-y-4, gap-4)
Relaxed:      24px (space-y-6, gap-6)
Loose:        32px (space-y-8, gap-8)
Extra Loose:  48px (space-y-12, gap-12)
```

### Component Spacing

```css
Input Padding:      px-4 py-3  (16px horizontal, 12px vertical)
Button Padding:     px-6 py-3  (24px horizontal, 12px vertical)
Card Padding:       p-6        (24px all sides)
Section Padding:    py-12      (48px vertical)
Page Container:     px-6 md:px-12 lg:px-16 (responsive)
```

---

## Border Radius

```css
Small:   rounded-md  (6px)  - Badges, small buttons
Medium:  rounded-lg  (8px)  - Buttons, inputs, cards
Large:   rounded-xl  (12px) - Modal dialogs, large cards
Extra:   rounded-2xl (16px) - Hero sections, feature cards
Full:    rounded-full       - Avatar, pills, icon buttons
```

---

## Shadows

```css
/* Subtle elevation */
shadow-sm:  0 1px 2px rgba(0, 0, 0, 0.05)

/* Card elevation */
shadow:     0 1px 3px rgba(0, 0, 0, 0.1)

/* Elevated cards, dropdowns */
shadow-md:  0 4px 6px rgba(0, 0, 0, 0.1)

/* Modals, popovers */
shadow-lg:  0 10px 15px rgba(0, 0, 0, 0.1)

/* Maximum elevation */
shadow-2xl: 0 25px 50px rgba(0, 0, 0, 0.25)
```

---

## Component Library

### Buttons

#### Primary Button

```jsx
<button className="px-6 py-3 bg-primary-600 text-white rounded-lg font-medium
                   hover:bg-primary-700 active:bg-primary-800
                   focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                   transition-colors duration-200
                   disabled:opacity-50 disabled:cursor-not-allowed">
  Generate Video
</button>
```

#### Secondary Button

```jsx
<button className="px-6 py-3 bg-white text-gray-700 border-2 border-gray-300
                   rounded-lg font-medium
                   hover:bg-gray-50 hover:border-gray-400
                   active:bg-gray-100
                   focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                   transition-colors duration-200">
  Cancel
</button>
```

#### Success Button

```jsx
<button className="px-6 py-3 bg-success-600 text-white rounded-lg font-medium
                   hover:bg-success-700
                   focus:outline-none focus:ring-2 focus:ring-success-500 focus:ring-offset-2
                   transition-colors duration-200">
  Download PDF
</button>
```

#### Icon Button

```jsx
<button className="p-2 rounded-lg text-gray-600 hover:bg-gray-100
                   focus:outline-none focus:ring-2 focus:ring-primary-500
                   transition-colors duration-200"
        aria-label="Menu">
  <MenuIcon className="w-5 h-5" />
</button>
```

### Form Elements

#### Text Input

```jsx
<div className="space-y-2">
  <label className="block text-sm font-medium text-gray-700">
    Email Address
  </label>
  <input
    type="email"
    className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg
               focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-20
               focus:outline-none
               placeholder:text-gray-400
               transition-all duration-200"
    placeholder="you@example.com"
  />
  <p className="text-sm text-gray-500">
    We'll never share your email.
  </p>
</div>
```

#### URL Input (Custom Video Generation)

```jsx
<div className="space-y-2">
  <label className="block text-sm font-medium text-gray-700">
    Article or Paper URL
  </label>
  <div className="relative">
    <input
      type="url"
      className="w-full px-4 py-3 pl-10 bg-white border-2 border-gray-300 rounded-lg
                 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-20
                 focus:outline-none
                 placeholder:text-gray-400"
      placeholder="https://arxiv.org/abs/..."
    />
    <LinkIcon className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
  </div>
</div>
```

#### Error State

```jsx
<div className="space-y-2">
  <label className="block text-sm font-medium text-gray-700">
    GitHub Repository URL
  </label>
  <input
    type="url"
    className="w-full px-4 py-3 bg-white border-2 border-error-600 rounded-lg
               focus:border-error-600 focus:ring-2 focus:ring-error-500 focus:ring-opacity-20
               focus:outline-none"
    value="invalid-url"
  />
  <p className="text-sm text-error-600 flex items-center gap-1">
    <AlertCircle className="w-4 h-4" />
    Please enter a valid GitHub repository URL
  </p>
</div>
```

### Cards

#### Video Card (Dashboard)

```jsx
<div className="bg-white rounded-xl border border-gray-200 overflow-hidden
                hover:shadow-lg hover:border-primary-200
                transition-all duration-200 cursor-pointer group">
  {/* Thumbnail */}
  <div className="aspect-video bg-gray-100 relative overflow-hidden">
    <img src={thumbnail} alt={title} className="w-full h-full object-cover
                                                 group-hover:scale-105 transition-transform duration-300" />
    {/* Duration Badge */}
    <div className="absolute bottom-2 right-2 px-2 py-1 bg-gray-900 bg-opacity-80
                    text-white text-xs font-semibold rounded">
      7:32
    </div>
    {/* Category Badge */}
    <div className="absolute top-2 left-2 px-2 py-1 bg-purple-600
                    text-white text-xs font-semibold rounded-full">
      AI/ML
    </div>
  </div>

  {/* Content */}
  <div className="p-4">
    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2
                   group-hover:text-primary-600 transition-colors">
      Understanding Transformer Architecture
    </h3>
    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
      A comprehensive breakdown of attention mechanisms and their role in modern NLP...
    </p>
    <div className="flex items-center justify-between text-xs text-gray-500">
      <span>2 days ago</span>
      <span className="flex items-center gap-1">
        <Eye className="w-4 h-4" />
        1.2k views
      </span>
    </div>
  </div>
</div>
```

#### Feature Card (Landing Page)

```jsx
<div className="bg-white rounded-2xl border border-gray-200 p-8
                hover:border-primary-300 hover:shadow-md
                transition-all duration-200">
  {/* Icon */}
  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
    <VideoIcon className="w-6 h-6 text-primary-600" />
  </div>

  {/* Content */}
  <h3 className="text-xl font-semibold text-gray-900 mb-2">
    Custom Video Generation
  </h3>
  <p className="text-base text-gray-600 leading-relaxed">
    Paste any research paper or technical article URL and get a 5-10 minute
    educational video in minutes.
  </p>
</div>
```

#### Review Result Card

```jsx
<div className="bg-white rounded-xl border border-gray-200 p-6">
  {/* Score Header */}
  <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-1">
        Code Quality Score
      </h3>
      <p className="text-sm text-gray-500">
        Based on structure, documentation, and best practices
      </p>
    </div>
    <div className="text-5xl font-bold text-primary-600">
      7.8
      <span className="text-2xl text-gray-400">/10</span>
    </div>
  </div>

  {/* Strengths */}
  <div className="mb-6">
    <h4 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
      Strengths
    </h4>
    <ul className="space-y-2">
      <li className="flex items-start gap-2 text-sm text-gray-700">
        <CheckCircle className="w-5 h-5 text-success-600 flex-shrink-0 mt-0.5" />
        <span>Well-organized module structure with clear separation of concerns</span>
      </li>
      <li className="flex items-start gap-2 text-sm text-gray-700">
        <CheckCircle className="w-5 h-5 text-success-600 flex-shrink-0 mt-0.5" />
        <span>Comprehensive README with setup instructions and examples</span>
      </li>
    </ul>
  </div>

  {/* Improvements */}
  <div>
    <h4 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
      Areas for Improvement
    </h4>
    <ul className="space-y-2">
      <li className="flex items-start gap-2 text-sm text-gray-700">
        <AlertCircle className="w-5 h-5 text-warning-600 flex-shrink-0 mt-0.5" />
        <span>Add type hints to function parameters for better code clarity</span>
      </li>
      <li className="flex items-start gap-2 text-sm text-gray-700">
        <AlertCircle className="w-5 h-5 text-warning-600 flex-shrink-0 mt-0.5" />
        <span>Include unit tests to ensure code reliability</span>
      </li>
    </ul>
  </div>
</div>
```

### Navigation

#### Top Navigation Bar

```jsx
<nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
  <div className="max-w-7xl mx-auto px-6 py-4">
    <div className="flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <GraduationCap className="w-8 h-8 text-primary-600" />
        <span className="text-xl font-bold text-gray-900">
          LearnAI
        </span>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-8">
        <a href="/dashboard" className="text-base font-medium text-gray-700
                                        hover:text-primary-600 transition-colors">
          Dashboard
        </a>
        <a href="/create" className="text-base font-medium text-gray-700
                                     hover:text-primary-600 transition-colors">
          Create Video
        </a>
        <a href="/review" className="text-base font-medium text-gray-700
                                     hover:text-primary-600 transition-colors">
          Review Project
        </a>
      </div>

      {/* Auth Buttons */}
      <div className="flex items-center gap-3">
        <button className="px-4 py-2 text-gray-700 font-medium
                          hover:text-primary-600 transition-colors">
          Log In
        </button>
        <button className="px-6 py-2 bg-primary-600 text-white rounded-lg font-medium
                          hover:bg-primary-700 transition-colors">
          Sign Up
        </button>
      </div>
    </div>
  </div>
</nav>
```

#### Tab Navigation (Categories)

```jsx
<div className="border-b border-gray-200">
  <nav className="flex space-x-8" aria-label="Categories">
    {['All', 'AI/ML', 'Data Science', 'Research Papers'].map((category) => (
      <button
        key={category}
        className={`
          px-1 py-4 text-base font-medium border-b-2 -mb-px
          transition-all duration-200
          ${activeCategory === category
            ? 'border-primary-600 text-primary-600'
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }
        `}
      >
        {category}
      </button>
    ))}
  </nav>
</div>
```

### Alerts & Notifications

#### Success Alert

```jsx
<div className="bg-success-50 border border-success-200 rounded-lg p-4
                flex items-start gap-3">
  <CheckCircle className="w-5 h-5 text-success-600 flex-shrink-0 mt-0.5" />
  <div className="flex-1">
    <h4 className="text-sm font-semibold text-success-900 mb-1">
      Video Generated Successfully!
    </h4>
    <p className="text-sm text-success-700">
      Your video is ready to watch. It's been saved to your library.
    </p>
  </div>
  <button className="text-success-600 hover:text-success-700">
    <X className="w-5 h-5" />
  </button>
</div>
```

#### Error Alert

```jsx
<div className="bg-error-50 border border-error-200 rounded-lg p-4
                flex items-start gap-3">
  <XCircle className="w-5 h-5 text-error-600 flex-shrink-0 mt-0.5" />
  <div className="flex-1">
    <h4 className="text-sm font-semibold text-error-900 mb-1">
      Generation Failed
    </h4>
    <p className="text-sm text-error-700">
      Unable to access the URL. Please check the link and try again.
    </p>
  </div>
</div>
```

#### Info Banner

```jsx
<div className="bg-info-50 border border-info-200 rounded-lg p-4
                flex items-start gap-3">
  <Info className="w-5 h-5 text-info-600 flex-shrink-0 mt-0.5" />
  <div className="flex-1">
    <p className="text-sm text-info-700">
      AI-generated review - use as a learning guide, not a definitive assessment.
    </p>
  </div>
</div>
```

### Loading States

#### Spinner

```jsx
<div className="flex items-center justify-center p-8">
  <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200
                  border-t-primary-600" />
</div>
```

#### Loading Page (Video Generation)

```jsx
<div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
  <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
    {/* Animated Icon */}
    <div className="mb-6 relative">
      <div className="w-24 h-24 mx-auto bg-primary-100 rounded-full
                      flex items-center justify-center">
        <Sparkles className="w-12 h-12 text-primary-600 animate-pulse" />
      </div>
      {/* Spinning Ring */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-32 h-32 border-4 border-primary-200 border-t-primary-600
                        rounded-full animate-spin" />
      </div>
    </div>

    {/* Message */}
    <h2 className="text-2xl font-semibold text-gray-900 mb-2">
      Generating Your Video
    </h2>
    <p className="text-base text-gray-600 mb-6">
      This may take 2-5 minutes. We're analyzing the content and creating
      an educational video just for you.
    </p>

    {/* Progress */}
    <div className="space-y-3">
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-700 font-medium">Extracting content...</span>
        <CheckCircle className="w-5 h-5 text-success-600" />
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-700 font-medium">Generating script...</span>
        <div className="w-5 h-5 border-2 border-primary-600 border-t-transparent
                        rounded-full animate-spin" />
      </div>
      <div className="flex items-center justify-between text-sm text-gray-400">
        <span>Creating video...</span>
        <Clock className="w-5 h-5" />
      </div>
    </div>
  </div>
</div>
```

#### Skeleton Loader (Video Cards)

```jsx
<div className="bg-white rounded-xl border border-gray-200 overflow-hidden animate-pulse">
  {/* Thumbnail Skeleton */}
  <div className="aspect-video bg-gray-200" />

  {/* Content Skeleton */}
  <div className="p-4 space-y-3">
    <div className="h-5 bg-gray-200 rounded w-3/4" />
    <div className="h-4 bg-gray-200 rounded w-full" />
    <div className="h-4 bg-gray-200 rounded w-5/6" />
    <div className="flex justify-between">
      <div className="h-3 bg-gray-200 rounded w-20" />
      <div className="h-3 bg-gray-200 rounded w-16" />
    </div>
  </div>
</div>
```

### Badges

#### Category Badge

```jsx
<span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold
               bg-purple-100 text-purple-700">
  AI/ML
</span>

<span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold
               bg-cyan-100 text-cyan-700">
  Data Science
</span>

<span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold
               bg-pink-100 text-pink-700">
  Research
</span>
```

#### Duration Badge

```jsx
<span className="inline-flex items-center gap-1 px-2 py-1 rounded
               bg-gray-900 bg-opacity-80 text-white text-xs font-semibold">
  <Clock className="w-3 h-3" />
  7:32
</span>
```

#### Status Badge

```jsx
<span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold
               bg-success-100 text-success-700">
  <CheckCircle className="w-3 h-3" />
  Complete
</span>

<span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold
               bg-warning-100 text-warning-700">
  <Clock className="w-3 h-3" />
  Processing
</span>
```

### Modals

#### Confirmation Modal

```jsx
{/* Backdrop */}
<div className="fixed inset-0 bg-black bg-opacity-50 z-40 backdrop-blur-sm"
     onClick={onClose} />

{/* Modal */}
<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
  <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6
                  transform transition-all">
    <div className="mb-4">
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        Delete Video?
      </h3>
      <p className="text-base text-gray-600">
        This action cannot be undone. The video will be permanently removed
        from your library.
      </p>
    </div>

    <div className="flex gap-3 justify-end">
      <button onClick={onClose}
              className="px-6 py-2 border-2 border-gray-300 rounded-lg
                         text-gray-700 font-medium hover:bg-gray-50">
        Cancel
      </button>
      <button onClick={onConfirm}
              className="px-6 py-2 bg-error-600 text-white rounded-lg
                         font-medium hover:bg-error-700">
        Delete
      </button>
    </div>
  </div>
</div>
```

### Empty States

```jsx
<div className="flex flex-col items-center justify-center p-12 text-center">
  {/* Icon */}
  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
    <VideoOff className="w-10 h-10 text-gray-400" />
  </div>

  {/* Message */}
  <h3 className="text-xl font-semibold text-gray-900 mb-2">
    No videos yet
  </h3>
  <p className="text-base text-gray-500 mb-6 max-w-sm">
    Generate your first custom video by pasting a research paper or article URL.
  </p>

  {/* CTA */}
  <button className="px-6 py-3 bg-primary-600 text-white rounded-lg font-medium
                     hover:bg-primary-700 transition-colors">
    Create Your First Video
  </button>
</div>
```

---

## Responsive Design

### Breakpoints

```css
Mobile:       < 640px   (default, mobile-first)
Tablet:       640px+    (sm:)
Desktop:      1024px+   (lg:)
Wide:         1280px+   (xl:)
Ultra-wide:   1536px+   (2xl:)
```

### Common Patterns

```jsx
// Stack on mobile, grid on tablet+
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

// Hide on mobile, show on desktop
<div className="hidden lg:block">

// Full width on mobile, constrained on desktop
<div className="w-full lg:max-w-4xl mx-auto">

// Responsive padding
<div className="px-4 sm:px-6 lg:px-8">

// Responsive text size
<h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
```

---

## Accessibility Guidelines

### Color Contrast
- Text on white: minimum gray-700 for WCAG AA
- Interactive elements: 4.5:1 contrast ratio minimum
- Focus states always visible with ring utilities

### Keyboard Navigation
```jsx
// Focus states
className="focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"

// Skip links
<a href="#main-content" className="sr-only focus:not-sr-only">
  Skip to content
</a>
```

### Screen Readers
```jsx
// ARIA labels for icon buttons
<button aria-label="Close modal">
  <X className="w-5 h-5" />
</button>

// Live regions for dynamic content
<div aria-live="polite" aria-atomic="true">
  {statusMessage}
</div>
```

---

## Animation Guidelines

### Transitions

```css
Fast:    150ms  - Hover states, color changes
Normal:  200ms  - Standard transitions
Slow:    300ms  - Modals, page transitions
```

### Common Animations

```jsx
// Fade in
<div className="animate-fade-in">

// Slide up
<div className="animate-slide-up">

// Pulse (loading)
<div className="animate-pulse">

// Spin (loading spinner)
<div className="animate-spin">

// Bounce (attention)
<div className="animate-bounce">
```

### Custom Animations (tailwind.config.js)

```javascript
module.exports = {
  theme: {
    extend: {
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
    }
  }
}
```

---

## Design Tokens (for developers)

```javascript
// colors.js
export const colors = {
  primary: {
    50: '#eef2ff',
    600: '#4f46e5',
    700: '#4338ca',
  },
  success: {
    50: '#d1fae5',
    600: '#059669',
  },
  error: {
    50: '#fee2e2',
    600: '#dc2626',
  },
  warning: {
    50: '#fef3c7',
    600: '#d97706',
  },
  categories: {
    aiml: '#8b5cf6',
    dataScience: '#06b6d4',
    research: '#ec4899',
  }
};

// spacing.js
export const spacing = {
  xs: '8px',
  sm: '12px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
};

// typography.js
export const typography = {
  fontFamily: "'Inter', sans-serif",
  fontSize: {
    xs: '12px',
    sm: '14px',
    base: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '30px',
    '4xl': '36px',
    '5xl': '48px',
  }
};
```

---

## Best Practices

### Do's ✅
- Use Inter font for all text
- Maintain consistent spacing (4px increments)
- Always include focus states for accessibility
- Use semantic color (success, error, warning) for feedback
- Provide loading states for all async operations
- Include empty states with clear CTAs
- Test on mobile devices
- Use proper heading hierarchy (h1 → h2 → h3)
- Include alt text for all images
- Provide clear error messages

### Don'ts ❌
- Don't use custom colors outside the palette
- Don't skip loading states (users wait 2-5 minutes!)
- Don't use small touch targets (<44x44px on mobile)
- Don't rely on color alone (use icons + text)
- Don't use low-contrast text
- Don't auto-play videos without user interaction
- Don't use more than 3 font weights in one view
- Don't create walls of text (break into sections)

---

## Next Steps

This design system provides the foundation. Next, implement:
1. Page layouts (Landing, Dashboard, Auth, etc.)
2. React component library
3. Video player integration
4. Mobile-responsive testing
5. Accessibility audit

Ready to build a beautiful, accessible learning platform! 🚀
