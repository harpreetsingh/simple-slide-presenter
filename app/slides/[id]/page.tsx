"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { SlideViewer } from "@/components/SlideViewer"
import { Navigation } from "@/components/Navigation"
import { loadSlidesFromFile, type SlideData, type Slide } from "@/lib/markdown-parser"
import { Button } from "@/components/ui/button"
import { Home, RefreshCw } from "lucide-react"

export default function SlidePage() {
  const router = useRouter()
  const params = useParams()
  const slideId = Number.parseInt(params.id as string, 10)

  const [slideData, setSlideData] = useState<SlideData | null>(null)
  const [currentSlide, setCurrentSlide] = useState<Slide | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadSlides() {
      try {
        const data = await loadSlidesFromFile()
        setSlideData(data)

        // Find the current slide
        const slide = data.slides.find((s) => s.id === slideId)
        if (!slide) {
          setError(`Slide ${slideId} not found`)
          return
        }

        setCurrentSlide(slide)
      } catch (err) {
        setError("Failed to load slides")
        console.error("Error loading slides:", err)
      } finally {
        setLoading(false)
      }
    }

    loadSlides()
  }, [slideId])

  const handlePrevious = () => {
    if (slideId > 1) {
      router.push(`/slides/${slideId - 1}`)
    }
  }

  const handleNext = () => {
    if (slideData && slideId < slideData.totalSlides) {
      router.push(`/slides/${slideId + 1}`)
    }
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Prevent default behavior for arrow keys to avoid page scrolling
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault()
      }

      switch (event.key) {
        case "ArrowLeft":
          handlePrevious()
          break
        case "ArrowRight":
          handleNext()
          break
      }
    }

    // Add event listener
    window.addEventListener("keydown", handleKeyDown)

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [slideId, slideData]) // Dependencies ensure handlers have latest state

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-background via-background to-muted/30">
        <div className="text-center space-y-6">
          <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto animate-spin">
            <div className="w-12 h-12 bg-background rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-gradient-to-r from-primary to-accent rounded-full" />
            </div>
          </div>
          <div className="text-xl font-semibold text-card-foreground">Loading slides...</div>
          <div className="text-sm text-muted-foreground">Preparing your presentation</div>
        </div>
      </div>
    )
  }

  if (error || !currentSlide || !slideData) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-background via-background to-muted/30">
        <div className="text-center space-y-6 max-w-md mx-auto p-8">
          <div className="w-20 h-20 bg-gradient-to-r from-destructive/20 to-destructive/10 rounded-full flex items-center justify-center mx-auto">
            <span className="text-4xl">😕</span>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-card-foreground">Oops! Something went wrong</h2>
            <p className="text-destructive font-medium">{error || "Slide not found"}</p>
            <p className="text-sm text-muted-foreground">
              The slide you're looking for might have been moved or doesn't exist.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={() => router.push("/")}
              className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground shadow-lg shadow-primary/25 rounded-xl"
            >
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Button>
            <Button
              variant="outline"
              onClick={() => window.location.reload()}
              className="border-border/50 hover:bg-card/50 rounded-xl"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      <SlideViewer 
        slide={currentSlide} 
        currentSlide={slideId} 
        totalSlides={slideData.totalSlides} 
        presentationTitle={slideData.presentationTitle}
      />
      <Navigation
        currentSlide={slideId}
        totalSlides={slideData.totalSlides}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />
    </div>
  )
}
