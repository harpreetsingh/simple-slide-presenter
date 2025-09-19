import type { Slide, ContentElement } from "@/lib/markdown-parser"

interface SlideViewerProps {
  slide: Slide
  currentSlide: number
  totalSlides: number
  presentationTitle?: string
}

function renderContentElements(elements: ContentElement[]) {
  return elements.map((element, index) => {
    if (element.type === 'link') {
      return (
        <a
          key={index}
          href={element.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:text-primary/80 underline underline-offset-4 transition-colors duration-200"
        >
          {element.text}
        </a>
      )
    } else {
      return <span key={index}>{element.text}</span>
    }
  })
}

export function SlideViewer({ slide, currentSlide, totalSlides, presentationTitle }: SlideViewerProps) {
  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-background via-background to-muted/30">
      <div className="bg-card/80 backdrop-blur-sm border-b border-border/50 px-6 py-4">
        <div className="max-w-4xl mx-auto">
          {/* Presentation Title */}
          {presentationTitle && (
            <div className="text-center mb-4">
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
                {presentationTitle}
              </h1>
            </div>
          )}
          
          {/* Navigation and Progress */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">{currentSlide}</span>
              </div>
              <div className="text-sm text-muted-foreground">
                Slide {currentSlide} of {totalSlides}
              </div>
            </div>

            {/* Progress bar */}
            <div className="flex-1 max-w-xs mx-8">
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${(currentSlide / totalSlides) * 100}%` }}
                />
              </div>
            </div>

            <div className="text-xs text-muted-foreground bg-muted/50 px-3 py-1 rounded-full">Use ← → to navigate</div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center p-8 max-w-5xl mx-auto w-full">
        <div className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl p-12 shadow-2xl shadow-primary/5 w-full">
          <div className="space-y-10">
            {/* Slide Title - Centered */}
            <div className="text-center">
              <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent text-balance leading-tight">
                {slide.title}
              </h2>
            </div>

            {/* Bullet Points - Left Aligned */}
            <div className="space-y-8 max-w-4xl mx-auto">
              {slide.content.map((contentElements, index) => (
                <div key={index} className="flex items-start group">
                  <div className="text-xl md:text-2xl text-card-foreground leading-relaxed flex items-start gap-6">
                    <div className="relative flex-shrink-0 mt-2">
                      <div className="w-3 h-3 bg-gradient-to-r from-primary to-accent rounded-full group-hover:scale-110 transition-transform duration-200" />
                      <div className="absolute inset-0 w-3 h-3 bg-gradient-to-r from-primary to-accent rounded-full animate-pulse opacity-30" />
                    </div>
                    <span className="text-pretty font-medium text-left">
                      {renderContentElements(contentElements)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
