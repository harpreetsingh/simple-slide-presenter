export interface Slide {
  id: number
  title: string
  content: string[]
}

export interface SlideData {
  slides: Slide[]
  totalSlides: number
  presentationTitle?: string
}

export function parseMarkdownToSlides(markdownContent: string): SlideData {
  const lines = markdownContent.split("\n")
  const slides: Slide[] = []
  let currentSlide: Slide | null = null
  let slideId = 1
  let presentationTitle: string | undefined = undefined
  let foundFirstH1 = false

  for (const line of lines) {
    const trimmedLine = line.trim()

    // Check if line is an H1 heading
    if (trimmedLine.startsWith("# ")) {
      if (!foundFirstH1) {
        // First H1 is the presentation title
        presentationTitle = trimmedLine.substring(2).trim()
        foundFirstH1 = true
      } else {
        // Subsequent H1s are treated as slide titles (but we'll use H2 going forward)
        // Save previous slide if exists
        if (currentSlide) {
          slides.push(currentSlide)
        }

        // Start new slide
        currentSlide = {
          id: slideId++,
          title: trimmedLine.substring(2).trim(),
          content: [],
        }
      }
    }
    // Check if line is an H2 heading (new slide title format)
    else if (trimmedLine.startsWith("## ")) {
      // Save previous slide if exists
      if (currentSlide) {
        slides.push(currentSlide)
      }

      // Start new slide
      currentSlide = {
        id: slideId++,
        title: trimmedLine.substring(3).trim(),
        content: [],
      }
    }
    // Check if line is a bullet point and we have a current slide
    else if (currentSlide && (trimmedLine.startsWith("- ") || trimmedLine.startsWith("* "))) {
      const bulletContent = trimmedLine.substring(2).trim()
      if (bulletContent) {
        currentSlide.content.push(bulletContent)
      }
    }
  }

  // Don't forget the last slide
  if (currentSlide) {
    slides.push(currentSlide)
  }

  return {
    slides,
    totalSlides: slides.length,
    presentationTitle,
  }
}

export async function loadSlidesFromFile(): Promise<SlideData> {
  try {
    const response = await fetch("/slides-presentation-input.md")
    if (!response.ok) {
      throw new Error("Failed to load slides file")
    }
    const markdownContent = await response.text()
    return parseMarkdownToSlides(markdownContent)
  } catch (error) {
    console.error("Error loading slides:", error)
    // Return default slides if file loading fails
    return {
      slides: [
        {
          id: 1,
          title: "Error Loading Slides",
          content: [
            "Could not load slides-presentation-input.md",
            "Please check if the file exists in the public directory",
          ],
        },
      ],
      totalSlides: 1,
      presentationTitle: "Error",
    }
  }
}
