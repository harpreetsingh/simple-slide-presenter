# Slide Presentation Web App - PRD Design Document

## Executive Summary

A lightweight Next.js web application that converts markdown files into shareable slide presentations. The app parses H1 headings as slide titles and bullet points as content, providing a simple navigation interface for presenting and sharing ideas.

## Product Overview

### Vision Statement
Simplify idea sharing through markdown-powered slide presentations that can be instantly shared via URL without complex presentation software.

### Success Metrics
- Zero setup time for viewers
- Easy content updates through file replacement

## User Stories

### Primary User (Presenter)
- **As a presenter**, I want to create slides using markdown syntax so I can focus on content rather than formatting
- **As a presenter**, I want to share my presentation via URL so others can access it instantly
- **As a presenter**, I want to update my presentation by replacing the markdown file so I can iterate quickly

### Secondary User (Viewer)
- **As a viewer**, I want to navigate through slides easily so I can follow the presentation at my own pace
- **As a viewer**, I want to jump to specific slides via URL so I can reference particular points

## Technical Specifications

### Architecture
- **Framework**: Next.js 14+ with TypeScript
- **Routing**: App Router for slide navigation
- **Markdown Parser**: `marked` or `gray-matter` library
- **Styling**: Tailwind CSS for responsive design
- **Deployment**: Vercel (recommended) or similar static hosting

### File Structure
```
/
├── app/
│   ├── page.tsx              # Home/first slide
│   ├── slides/[id]/page.tsx  # Individual slide pages
│   └── layout.tsx            # App layout
├── components/
│   ├── SlideViewer.tsx       # Main slide display component
│   ├── Navigation.tsx        # Previous/Next controls
│   └── ProgressBar.tsx       # Slide progress indicator
├── lib/
│   └── markdown-parser.ts    # Markdown processing logic
├── public/
│   └── slides.md             # Slide content file
└── types/
    └── slide.ts              # TypeScript interfaces
```

### Data Models

#### Slide Interface
```typescript
interface Slide {
  id: number;
  title: string;
  bulletPoints: string[];
}

interface Presentation {
  slides: Slide[];
  totalSlides: number;
  title?: string;
}
```

## Feature Requirements

### Must Have (MVP)
1. **Markdown Parsing**
   - Parse H1 headings (`# Title`) as slide titles
   - Parse bullet points (`- Point`) as slide content
   - Handle malformed markdown gracefully

2. **Slide Navigation**
   - Previous/Next buttons
   - Keyboard arrow key support
   - URL routing (`/slides/1`, `/slides/2`, etc.)
   - Disable navigation at boundaries (first/last slide)

3. **Responsive UI**
   - Touch-friendly navigation buttons
   - Readable typography
   - Progress indicator showing current slide position

4. **URL Sharing**
   - Deep linking to specific slides
   - Clean URLs for easy sharing
   - Automatic redirect to slide 1 if invalid slide number

### Nice to Have (Future Enhancements)
- Slide thumbnails overview
- Auto-advance timer option
- Full-screen presentation mode
- Print/PDF export functionality
- Multiple markdown file support

## User Experience Design

### Layout Structure
```
┌─────────────────────────────────────┐
│              Header                 │
│           (optional title)          │
├─────────────────────────────────────┤
│                                     │
│         Slide Title (H1)            │
│                                     │
│         • Bullet point 1            │
│         • Bullet point 2            │
│         • Bullet point 3            │
│                                     │
├─────────────────────────────────────┤
│  [← Prev]     3 / 8     [Next →]    │
├─────────────────────────────────────┤
│          Progress Bar               │
└─────────────────────────────────────┘
```

### Navigation Behavior
- **Previous Button**: Disabled on slide 1, navigates to previous slide
- **Next Button**: Disabled on last slide, navigates to next slide
- **Keyboard**: Left/Right arrows for navigation
- **URL Updates**: Automatically update URL without page refresh
- **Direct Access**: Allow `/slides/5` to jump directly to slide 5

### Typography & Spacing
- **Slide Title**: Large, bold font (2.5rem)
- **Bullet Points**: Medium font (1.25rem) with comfortable line spacing
- **Navigation**: Small, unobtrusive text (0.875rem)
- **Margins**: Generous white space for readability

## Content Format Specification

### Markdown Structure
```markdown
# First Slide Title
- First key point
- Second key point
- Third key point

# Second Slide Title
- Another important point
- Supporting detail
- Additional context

# Final Slide
- Summary point
- Call to action
- Contact information
```

### Parsing Rules
- Each `# Heading` creates a new slide
- Only process bullet points (`-` or `*`) immediately following headings
- Ignore other markdown elements (images, links, code blocks)
- Maximum 10 bullet points per slide (truncate if more)
- Empty slides (headings with no bullets) show title only