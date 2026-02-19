"use client"

import { useEffect, useRef, useState } from "react"
import { Code2, Palette, Layers, Zap } from "lucide-react"

const highlights = [
  {
    icon: Code2,
    label: "Web Development",
    description: "Designing and building full-stack web applications using modern frontend technologies and backend frameworks like Django.",
  },
  {
    icon: Palette,
    label: "AI & Machine Learning",
    description: "Developing intelligent systems that learn from data using machine learning models, libraries, and LLM-based tools.",
  },
  {
    icon: Layers,
    label: "Software Architecture",
    description: "Structuring scalable, modular applications with maintainable object-oriented design and clear system organization.",
  },
  {
    icon: Zap,
    label: "Computer Vision & Deep Learning",
    description: "Creating visual understanding systems using OpenCV and deep learning techniques for perception and recognition tasks.",
  },
]

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 flex flex-col items-center text-center">
          <span className="mb-3 font-mono text-xs uppercase tracking-widest text-primary">
            About Me
          </span>
          <h2 className="mb-6 text-balance text-4xl font-bold text-foreground md:text-5xl">
            Digital
            <span className="text-primary"> Experiences</span>
          </h2>
          <p className="max-w-2xl text-pretty text-muted-foreground">
            I am driven to apply my skills in Django, OpenCV, and Machine Learning 
            to develop impactful applications that solve real-world challenges.
          </p>

          <div className="mt-6">
            <a
              href="https://drive.google.com/file/d/1lAjFb-FhDTxHZxkEXqK3eMOaXCk00sHa/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel px-6 py-3 text-sm font-medium text-primary border border-primary/20 rounded-lg backdrop-blur-md bg-primary/10 hover:bg-primary/20 hover:text-white hover:border-primary/40 transition-all duration-300 shadow-md hover:shadow-primary/30"
            >
              Get My CV
            </a>
          </div>
          {/* Education & Internship */}
          <div
            className="mt-12 grid w-full max-w-4xl gap-6 md:grid-cols-2"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.8s ease 0.4s, transform 0.8s ease 0.4s",
            }}
          >
            {/* Education */}
            <div className="glass-panel p-6 text-left">
              <h2 className="mb-3 font-mono text-sm font-semibold text-primary">
                Education
              </h2>
              <p className="text-sm text-foreground font-medium">
                B.Sc. in Software Engineering
              </p>
              <p className="text-sm text-muted-foreground">
                Noakhali Science and Technology University
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Expected Graduation: June, 2026
              </p>
            </div>
          
            {/* Internship */}
            <div className="glass-panel p-6 text-left">
              <h2 className="mb-3 font-mono text-sm font-semibold text-primary">
                Internship Experience
              </h2>
              <p className="text-sm text-foreground font-medium">
                Software Engineering (AI/ML) Intern
              </p>
              <p className="text-sm text-muted-foreground">
                FronTech Limited
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Duration: 3 Months
              </p>
            </div>
          </div>

        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item, i) => (
            <div
              key={item.label}
              className="glass-panel group relative overflow-hidden p-6 transition-all duration-500 hover:border-primary/30"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(30px)",
                transition: `opacity 0.6s ease ${i * 0.15}s, transform 0.6s ease ${i * 0.15}s`,
              }}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                <item.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 font-mono text-sm font-semibold text-foreground">
                {item.label}
              </h3>
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div
          className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-4"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.8s ease 0.6s, transform 0.8s ease 0.6s",
          }}
        >
          {[
            { value: "10+", label: "Projects Completed" },
            { value: "3+", label: "Months Industry-Level Experience" },
            { value: "25+", label: "Tools & Technologies" },
            { value: "5+", label: "Achievements" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="mb-1 font-mono text-3xl font-bold text-primary">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
