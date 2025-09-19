# Simple Slide Presenter

A lightweight Next.js web application that converts markdown files into shareable slide presentations. Transform your markdown content into professional-looking slides with clean navigation and instant URL sharing.

## 🚀 Overview

Simple Slide Presenter eliminates the complexity of traditional presentation software by using markdown syntax for content creation and providing a clean, distraction-free viewing experience that can be instantly shared via URL.

### Problem Statement
Traditional presentation tools are often overkill for simple concept sharing, requiring complex software installations, account setups, or heavyweight platforms when you just want to share a few key points with someone quickly.

### Solution
A lightweight web app that reads markdown content and presents it as navigable slides, allowing for instant sharing and easy content updates through file replacement.

## ✨ Features

### Core Features
- **Markdown-to-Slides Conversion**: Automatically parse markdown files where H1 defines presentation title and H2 headings become slide titles
- **Simple Navigation**: Previous/Next buttons and keyboard controls for slide progression
- **URL Sharing**: Direct links to specific slides for easy sharing (`/slides/1`, `/slides/2`, etc.)
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Keyboard Controls**: Arrow key navigation for presenter convenience
- **Progress Indication**: Visual progress bar and slide counter

### Content Features
- **Presentation Title**: First H1 heading (`# Title`) sets the presentation title
- **Slide Titles**: H2 headings (`## Slide Title`) create new slides
- **Bullet Points**: Standard markdown bullet points (`-` or `*`) display as slide content
- **Clean Typography**: Optimized for readability and presentation
- **Left-Aligned Content**: Properly aligned bullet points for better readability

### Sharing Features
- **Direct Slide Links**: URL routing to jump to any specific slide
- **No Authentication**: Completely open access for easy sharing
- **Lightweight**: Fast loading with minimal dependencies

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ with TypeScript
- **Routing**: App Router for slide navigation
- **Styling**: Tailwind CSS for responsive design
- **UI Components**: Radix UI primitives with custom styling
- **Icons**: Lucide React
- **Deployment**: Vercel-ready

## 📁 Project Structure

```
/
├── app/
│   ├── page.tsx              # Home page with presentation overview
│   ├── slides/[id]/page.tsx  # Individual slide pages
│   └── layout.tsx            # App layout with theme provider
├── components/
│   ├── SlideViewer.tsx       # Main slide display component
│   ├── Navigation.tsx        # Previous/Next controls
│   ├── theme-provider.tsx    # Theme management
│   └── ui/                   # Reusable UI components
├── lib/
│   ├── markdown-parser.ts    # Markdown processing logic
│   └── utils.ts             # Utility functions
├── public/
│   └── slides-presentation-input.md  # Slide content file
└── hooks/                    # Custom React hooks
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and pnpm (or npm/yarn)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd simple-slide-presenter
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Start the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Quick Start with Your Content

1. **Edit the content file**
   Replace the content in `public/slides-presentation-input.md` with your own:

   ```markdown
   # Your Presentation Title

   ## Introduction
   - Welcome to the presentation
   - Overview of key topics
   - What you'll learn today

   ## Main Concept
   - Primary explanation point
   - Supporting evidence
   - Real-world example

   ## Conclusion
   - Summary of takeaways
   - Next steps
   - Thank you
   ```

2. **Reload the page**
   Your slides will automatically update with the new content.

## 📝 Content Format

### Markdown Structure

The app expects a specific markdown format:

```markdown
# Presentation Title

## First Slide Title
- First key point
- Second key point
- Third key point

## Second Slide Title
- Another important point
- Supporting detail
- Additional context

## Final Slide
- Summary point
- Call to action
- Contact information
```

### Parsing Rules

- **Presentation Title**: First H1 heading (`# Title`) sets the overall presentation title
- **Slide Creation**: Each H2 heading (`## Title`) creates a new slide
- **Content**: Only bullet points (`-` or `*`) immediately following headings are processed
- **Ignored Elements**: Other markdown elements (images, links, code blocks) are ignored
- **Empty Slides**: Headings with no bullets show title only

## 🎯 Usage

### Navigation
- **Keyboard**: Use left/right arrow keys to navigate
- **Mouse/Touch**: Click Previous/Next buttons
- **Direct Access**: Visit `/slides/3` to jump directly to slide 3
- **Progress**: Visual progress bar shows current position

### Sharing
- **Share specific slides**: Copy the URL (e.g., `yoursite.com/slides/5`)
- **Share presentation**: Use the base URL for automatic redirect to first slide
- **No login required**: Recipients can view immediately

### Updating Content
1. Edit `public/slides-presentation-input.md`
2. Refresh the browser
3. Content updates automatically

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Deploy with Vercel**
   - Connect your repository to Vercel
   - Deploy automatically with zero configuration
   - Your slides are now live and shareable!

### Deploy to Other Platforms

The app is a standard Next.js application and can be deployed to:
- Netlify
- Railway
- AWS Amplify
- Any platform supporting Node.js

## 🎨 Customization

### Styling
- Edit Tailwind classes in components for visual changes
- Modify `globals.css` for global styling
- Theme support built-in with next-themes

### Content Processing
- Extend `lib/markdown-parser.ts` for additional markdown features
- Add support for images, links, or other elements as needed

## 📊 User Stories

### For Presenters
- ✅ Create slides using simple markdown syntax
- ✅ Share presentations via URL instantly
- ✅ Update content by replacing the markdown file
- ✅ Navigate with keyboard controls during presentation

### For Viewers
- ✅ Navigate through slides at their own pace
- ✅ Jump to specific slides via URL
- ✅ View on any device with responsive design
- ✅ No setup or installation required

## 🔧 Development

### Available Scripts

```bash
# Development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linting
pnpm lint
```

### Adding Features

The codebase is structured for easy extension:
- Add new UI components in `components/ui/`
- Extend markdown parsing in `lib/markdown-parser.ts`
- Add new pages in the `app/` directory
- Customize styling with Tailwind CSS

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🎯 Future Enhancements

- [ ] Slide thumbnails overview
- [ ] Auto-advance timer option
- [ ] Full-screen presentation mode
- [ ] Print/PDF export functionality
- [ ] Multiple markdown file support
- [ ] Theme customization
- [ ] Presenter notes
- [ ] Slide transitions

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**
