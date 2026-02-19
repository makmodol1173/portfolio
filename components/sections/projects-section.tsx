"use client"

import { useState, useEffect, useRef } from "react"
import useSWR from "swr"
import { ExternalLink, Github } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Project } from "@/lib/types"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

const categories = ["all", "web", "ai-ml", "computer-vision"]

export function ProjectsSection() {
  const { data } = useSWR("/api/projects", fetcher)
  const [filter, setFilter] = useState("all")
  const [visible, setVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const projects: Project[] = data?.data || []
  const filtered =
    filter === "all" ? projects : projects.filter((p) => p.category === filter)

  return (
    <section id="projects" ref={sectionRef} className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 flex flex-col items-center text-center">
          <span className="mb-3 font-mono text-xs uppercase tracking-widest text-primary">
            Projects
          </span>
          <h2 className="mb-6 text-balance text-4xl font-bold text-foreground md:text-5xl">
            Featured <span className="text-primary">Projects</span>
          </h2>
          <p className="max-w-xl text-pretty text-muted-foreground">
            A selection of projects that showcase my skills in Web
            development, Computer vision, AI/ML related and interactive design.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={cn(
                "rounded-lg px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all",
                filter === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/50 text-muted-foreground hover:text-foreground"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, i) => (
            <div
              key={project.id}
              className="glass-panel group relative overflow-hidden transition-all duration-500 hover:border-primary/30"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(30px)",
                transition: `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`,
              }}
            >
              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden bg-secondary/30">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="font-mono text-4xl font-bold text-primary/20">
                    {project.title[0]}
                  </div>
                </div>
                {project.featured && (
                  <span className="absolute right-3 top-3 rounded-full bg-primary/90 px-2 py-0.5 font-mono text-[10px] uppercase text-primary-foreground">
                    Featured
                  </span>
                )}
                <div className="absolute inset-0 flex items-center justify-center gap-3 bg-background/80 opacity-0 transition-opacity group-hover:opacity-100">
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg bg-primary p-2 text-primary-foreground transition-transform hover:scale-110"
                      aria-label={`View ${project.title} live`}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg bg-secondary p-2 text-foreground transition-transform hover:scale-110"
                      aria-label={`View ${project.title} source`}
                    >
                      <Github className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="mb-2 font-semibold text-foreground">
                  {project.title}
                </h3>
                <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md bg-primary/10 px-2 py-0.5 font-mono text-[10px] text-primary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center text-muted-foreground">
            No projects found in this category.
          </div>
        )}
      </div>
    </section>
  )
}
