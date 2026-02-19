"use client"

import { useEffect, useRef, useState } from "react"
import useSWR from "swr"
import { cn } from "@/lib/utils"
import type { Skill } from "@/lib/types"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

const categoryColors: Record<string, string> = {
  frontend: "bg-[#00f0ff]/20 text-[#00f0ff]",
  backend: "bg-blue-500/20 text-blue-400",
  tools: "bg-emerald-500/20 text-emerald-400",
  design: "bg-amber-500/20 text-amber-400",
}

export function SkillsSection() {
  const { data } = useSWR("/api/skills", fetcher)
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

  const skills: Skill[] = data?.data || []
  const grouped = skills.reduce(
    (acc, skill) => {
      const cat = skill.category || "other"
      if (!acc[cat]) acc[cat] = []
      acc[cat].push(skill)
      return acc
    },
    {} as Record<string, Skill[]>
  )

  return (
    <section id="skills" ref={sectionRef} className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 flex flex-col items-center text-center">
          <span className="mb-3 font-mono text-xs uppercase tracking-widest text-primary">
            Skills
          </span>
          <h2 className="mb-6 text-balance text-4xl font-bold text-foreground md:text-5xl">
            Tech <span className="text-primary">Stack</span>
          </h2>
          <p className="max-w-xl text-pretty text-muted-foreground">
            Technologies and tools I use to bring ideas to life.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {Object.entries(grouped).map(([category, catSkills], ci) => (
            <div
              key={category}
              className="glass-panel overflow-hidden p-6"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.6s ease ${ci * 0.15}s, transform 0.6s ease ${ci * 0.15}s`,
              }}
            >
              <div className="mb-5 flex items-center gap-2">
                <span
                  className={cn(
                    "rounded-md px-2.5 py-1 font-mono text-xs font-medium capitalize",
                    categoryColors[category] || "bg-secondary text-foreground"
                  )}
                >
                  {category}
                </span>
              </div>
              <div className="flex flex-col gap-4">
                {catSkills.map((skill, si) => (
                  <div key={skill.id}>
                    <div className="mb-1.5 flex items-center justify-between">
                      <span className="font-mono text-sm text-foreground">
                        {skill.name}
                      </span>
                      <span className="font-mono text-xs text-muted-foreground">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary/50">
                      <div
                        className="h-full rounded-full bg-primary transition-all duration-1000"
                        style={{
                          width: visible ? `${skill.level}%` : "0%",
                          transitionDelay: `${ci * 0.15 + si * 0.08}s`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
