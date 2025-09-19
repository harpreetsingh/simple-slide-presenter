"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { loadSlidesFromFile, type SlideData } from "@/lib/markdown-parser"

export default function HomePage() {
  const router = useRouter()
  const [slideData, setSlideData] = useState<SlideData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadSlides() {
      try {
        const data = await loadSlidesFromFile()
        setSlideData(data)
        router.push("/slides/1")
      } catch (err) {
        console.error("Error loading slides:", err)
        setLoading(false)
      }
    }
    loadSlides()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-2 border-foreground border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading presentation...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <div className="border border-border rounded-lg p-12 bg-card">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{slideData?.presentationTitle || "Presentation"}</h1>
          <p className="text-muted-foreground text-lg">{slideData?.totalSlides} slides</p>
        </div>

        <p className="text-sm text-muted-foreground">Redirecting to presentation...</p>
      </div>
    </div>
  )
}
