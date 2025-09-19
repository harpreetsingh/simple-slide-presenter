"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Home, Maximize2 } from "lucide-react"

interface NavigationProps {
  currentSlide: number
  totalSlides: number
  onPrevious: () => void
  onNext: () => void
}

export function Navigation({ currentSlide, totalSlides, onPrevious, onNext }: NavigationProps) {
  const isFirstSlide = currentSlide === 1
  const isLastSlide = currentSlide === totalSlides

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-10">
      <div className="flex items-center gap-2 bg-card/80 backdrop-blur-md border border-border/50 rounded-2xl p-3 shadow-2xl shadow-primary/10">
        {/* Home button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => (window.location.href = "/")}
          className="flex items-center gap-2 hover:bg-muted/50 rounded-xl transition-all duration-200"
        >
          <Home className="w-4 h-4" />
        </Button>

        {/* Previous button */}
        <Button
          variant={isFirstSlide ? "ghost" : "default"}
          size="sm"
          onClick={onPrevious}
          disabled={isFirstSlide}
          className={`flex items-center gap-2 rounded-xl transition-all duration-200 ${
            !isFirstSlide
              ? "bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground shadow-lg shadow-primary/25"
              : "hover:bg-muted/50"
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Previous</span>
        </Button>

        {/* Slide counter with modern styling */}
        <div className="px-6 py-2 bg-muted/50 rounded-xl">
          <span className="text-sm font-semibold text-card-foreground">{currentSlide}</span>
          <span className="text-xs text-muted-foreground mx-1">/</span>
          <span className="text-sm text-muted-foreground">{totalSlides}</span>
        </div>

        {/* Next button */}
        <Button
          variant={isLastSlide ? "ghost" : "default"}
          size="sm"
          onClick={onNext}
          disabled={isLastSlide}
          className={`flex items-center gap-2 rounded-xl transition-all duration-200 ${
            !isLastSlide
              ? "bg-gradient-to-r from-accent to-accent/90 hover:from-accent/90 hover:to-accent text-accent-foreground shadow-lg shadow-accent/25"
              : "hover:bg-muted/50"
          }`}
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-4 h-4" />
        </Button>

        {/* Fullscreen button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            if (document.fullscreenElement) {
              document.exitFullscreen()
            } else {
              document.documentElement.requestFullscreen()
            }
          }}
          className="flex items-center gap-2 hover:bg-muted/50 rounded-xl transition-all duration-200"
        >
          <Maximize2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
