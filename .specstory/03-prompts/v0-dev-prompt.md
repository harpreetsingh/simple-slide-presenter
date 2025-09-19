# v0.dev Prompt: Markdown Slide Presentation App

Create a Next.js slide presentation web app that converts markdown content into navigable slides.

## Core Requirements

**Markdown Parsing:**
- Read content from a file called `slides-presentation-input.md` 
- Parse H1 headings (`# Title`) as slide titles
- Parse bullet points (`- Point` or `* Point`) immediately following headings as slide content
- Each H1 heading creates a new slide
- Ignore other markdown elements (links, images, code blocks)

**Navigation System:**
- Previous/Next buttons for slide navigation
- URL routing for direct slide access (`/slides/1`, `/slides/2`, etc.)
- Keyboard arrow key support (left/right arrows)
- Disable Previous button on first slide, Next button on last slide
- Show slide counter (e.g., "3 / 8")

**UI Layout:**
```
┌─────────────────────────────────────┐
│         Slide Title (Large)         │
│                                     │
│         • Bullet point 1            │
│         • Bullet point 2            │
│         • Bullet point 3            │
│                                     │
├─────────────────────────────────────┤
│  [← Prev]     3 / 8     [Next →]    │
└─────────────────────────────────────┘
```

## Technical Specs

- **Framework:** Next.js 14+ with TypeScript
- **Styling:** Tailwind CSS
- **Routing:** App Router with dynamic routes
- **Markdown Parser:** Use `marked` library or similar
- **File Location:** Place `slides-presentation-input.md` in `/public` directory

## Sample Markdown Content
```markdown
# Introduction
- Welcome to the presentation
- Overview of key topics
- What you'll learn today

# Main Concept
- Primary explanation point
- Supporting evidence
- Real-world example

# Conclusion
- Summary of takeaways
- Next steps
- Thank you
```

## Key Features to Implement

1. **Slide Display Component:** Clean typography with large title and readable bullet points
2. **Navigation Controls:** Styled Previous/Next buttons with hover effects
3. **URL Management:** Update browser URL without page refresh when navigating
4. **Keyboard Events:** Arrow key listeners for navigation
5. **Error Handling:** Graceful handling of invalid slide numbers in URL

## Design Requirements

- **Typography:** Large, bold slide titles (text-3xl or larger)
- **Spacing:** Generous margins and line spacing for readability  
- **Colors:** Clean, professional color scheme (preferably light background)
- **Buttons:** Clear, accessible navigation buttons
- **Responsive:** Basic responsive design (no need for complex mobile optimization)

## Expected File Structure
```
app/
├── page.tsx                 # Redirects to /slides/1
├── slides/[id]/page.tsx     # Individual slide pages
└── layout.tsx               # App layout
components/
├── SlideViewer.tsx          # Main slide display
└── Navigation.tsx           # Previous/Next controls
lib/
└── markdown-parser.ts       # Markdown processing
public/
└── slides-presentation-input.md  # Content file
```

Please generate a complete, working implementation with proper TypeScript interfaces and error handling.