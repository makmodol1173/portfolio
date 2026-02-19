"use client"

import Image from "next/image";
import { useEffect, useRef } from "react"
import { ArrowDown } from "lucide-react"
import { TypeAnimation } from "react-type-animation"

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const children = el.querySelectorAll("[data-animate]")
    children.forEach((child, i) => {
      const htmlChild = child as HTMLElement
      htmlChild.style.opacity = "0"
      htmlChild.style.transform = "translateY(30px)"
      setTimeout(() => {
        htmlChild.style.transition = "opacity 0.8s ease, transform 0.8s ease"
        htmlChild.style.opacity = "1"
        htmlChild.style.transform = "translateY(0)"
      }, 300 + i * 200)
    })
  }, [])

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <div
        ref={containerRef}
        className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 text-center"
      >
        {/* Status Badge */}
        <div
          data-animate
          className="mb-1 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 font-mono text-xs text-primary"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
          Available for Adventure...
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-6 py-12 gap-8">
        {/* Left Side: Text */}
        <div className="flex flex-col items-start md:w-1/2">
          {/* Main Heading */}
          <h1
            data-animate
            className="mb-8 text-left text-8xl font-bold leading-tight tracking-tight text-foreground md:text-6xl lg:text-5xl"
          >
            <img
            src="https://see.fontimg.com/api/rf5/lalw/NmVmNTQzOWYyN2RmNDkxZTg5MzIxYjY2ODM0OTRmZjAudHRm/SSdtIE1ha21kdWwgSGFzYW4gUmFiYmk/dream-her-regular.png?r=fs&h=65&w=1250&fg=3EF2F2&bg=000808&tb=1&s=70"
            />
            <br />
            <span className="text-primary neon-text">
              Software Engineer
            </span>
          </h1>

          {/* Typing Animation Section */}
          <TypeAnimation
            data-animate
            sequence={[
              "Software Engineer",
              1000,
              "Python, Django & REST API Developer",
              1000,
              "AI/ML & Generative AI Enthusiast",
              1000,
              "Computer Vision Researcher",
              1000,
              "Advanced Deep Learning Practitioner",
              1000,
            ]}
            wrapper="p"
            speed={50}
            repeat={Infinity}
            className="mb-8 max-w-xl text-left text-pretty text-lg text-muted-foreground md:text-xl"
          />
        </div>
          
        {/* Right Side: Circular Image */}
        <div className="md:w-1/2 flex justify-center md:justify-end">
          <div className="relative w-64 h-64 rounded-full overflow-hidden border-2 border-[#07e3d8] drop-shadow-[0_0_4px_#07e3d8]">

            <Image
              src="/images/portfolio_myimg.jpg"
              alt="Profile"
              fill
              sizes="256px"
              className="object-cover"
              priority
            />

          </div>
        </div>
      </div>

        {/* Buttons */}
        <div data-animate className="flex items-center gap-4">
          <button
            onClick={() =>
              document
                .getElementById("projects")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="rounded-lg bg-primary px-6 py-3 font-mono text-sm font-medium text-primary-foreground transition-all hover:opacity-90 neon-glow"
          >
            View Projects
          </button>
          <button
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="rounded-lg border border-border px-6 py-3 font-mono text-sm text-foreground transition-all hover:border-primary/50 hover:text-primary"
          >
            Get in Touch
          </button>
        </div>
      </div>

      {/* Scroll Down Button */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 animate-bounce text-muted-foreground transition-colors hover:text-primary"
        aria-label="Scroll to about section"
      >
        <ArrowDown className="h-6 w-6" />
      </button>
    </section>
  )
}
