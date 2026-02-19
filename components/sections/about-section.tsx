"use client"

import { useEffect, useRef, useState } from "react"
import { Trophy } from "lucide-react"

const highlights = [
  {
    icon: Trophy,
    platform: "Codeforces",
    username: "Shah_Moaz10",
    link: "https://codeforces.com/profile/Shah_Moaz10",
    solved: "200+ Problems",
    rating: "Current Rating: 1242 (pupil)",
  },
  {
    icon: Trophy,
    platform: "CodeChef",
    username: "moaz100",
    link: "https://www.codechef.com/users/moaz100",
    solved: "150+ Problems",
    rating: "Current Rating: 1479 (2★)",
  },
  {
    icon: Trophy,
    platform: "HackerRank",
    username: "makmodol1173",
    link: "https://www.hackerrank.com/makmodol1173",
    solved: "100+ Problems",
    rating: "Current Rating:--",
  },
  {
    icon: Trophy,
    platform: "LeetCode",
    username: "ShahMoaz10",
    link: "https://leetcode.com/ShahMoaz10",
    solved: "--",
    rating: "Current Rating:--",
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

        {/* Heading */}
        <div className="mb-16 flex flex-col items-center text-center">
          <span className="mb-3 font-mono text-xs uppercase tracking-widest text-primary">
            About Me
          </span>

          <h2 className="mb-6 text-4xl font-bold text-foreground md:text-5xl">
            Digital <span className="text-primary">Experiences</span>
          </h2>

          <p className="max-w-2xl text-muted-foreground">
            I am driven to apply my skills in Django, OpenCV, and Machine Learning
            to develop impactful applications that solve real-world challenges.
          </p>

          {/* CV Button */}
          <div className="mt-6">
            <a
              href="https://drive.google.com/file/d/18LvQoY-_nnWJSjl2DKWGLAx_tsBd473A/view"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel px-6 py-3 text-sm font-medium text-primary border border-primary/20 rounded-lg backdrop-blur-md bg-primary/10 hover:bg-primary/20 hover:text-white hover:border-primary/40 transition-all duration-300 shadow-md hover:shadow-primary/30"
            >
              Get My CV
            </a>
          </div>

          {/* Education + Internship */}
          <div
            className="mt-12 grid w-full max-w-4xl gap-6 md:grid-cols-2"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "0.8s ease",
            }}
          >
            <div className="glass-panel p-6 text-left">
              <h2 className="mb-4 font-mono text-xs uppercase font-semibold text-primary">
                Education
              </h2>
              <p className="mb-2 text-sm font-medium">
                B.Sc. in Software Engineering
              </p>
              <p className="text-sm text-muted-foreground">
                Noakhali Science and Technology University
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Expected Graduation: June, 2026
              </p>
            </div>

            <div className="glass-panel p-6 text-left">
              <h2 className="mb-4 font-mono text-xs uppercase font-semibold text-primary">
                Internship Experience
              </h2>
              <p className="mb-2 text-sm font-medium">
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

        {/* Competitive Programming Section */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item, i) => (
            <div
              key={item.platform}
              className="glass-panel p-6 text-center transition-all duration-500 hover:scale-105 hover:border-primary/40"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(30px)",
                transition: `opacity 0.6s ease ${i * 0.15}s, transform 0.6s ease ${i * 0.15}s`,
              }}
            >
              <div className="mb-3 flex justify-center text-primary">
                <item.icon className="h-6 w-6" />
              </div>

              <h3 className="font-mono text-sm font-semibold">
                {item.platform}
              </h3>

              <a
                href={item.link}
                target="_blank"
                className="text-xs text-primary underline"
              >
                {item.username}
              </a>

              <p className="mt-2 text-sm text-muted-foreground">
                Solved: {item.solved}
              </p>

              <p className="text-sm text-muted-foreground">
                {item.rating}
              </p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-4 text-center">
          {[
            { value: "10+", label: "Projects Completed" },
            { value: "400+", label: "Problems Solved" },
            { value: "25+", label: "Tools & Technologies" },
            { value: "5+", label: "Achievements" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="font-mono text-3xl font-bold text-primary">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
