"use client"

import { useEffect, useRef, useState } from "react"
import useSWR from "swr"
import { Calendar, ArrowUpRight } from "lucide-react"
import type { Post } from "@/lib/types"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function BlogSection() {
  const { data } = useSWR("/api/posts", fetcher)
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

  const posts: Post[] = (data?.data || []).filter((p: Post) => p.published)

  return (
    <section id="blog" ref={sectionRef} className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 flex flex-col items-center text-center">
          <span className="mb-3 font-mono text-xs uppercase tracking-widest text-primary">
            Blog
          </span>
          <h2 className="mb-6 text-balance text-4xl font-bold text-foreground md:text-5xl">
            Latest <span className="text-primary">Thoughts</span>
          </h2>
          <p className="max-w-xl text-pretty text-muted-foreground">
            Articles about development, design, and creative technology.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <article
              key={post.id}
              className="glass-panel group flex flex-col overflow-hidden transition-all duration-500 hover:border-primary/30"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(30px)",
                transition: `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`,
              }}
            >
              <div className="relative aspect-[2/1] overflow-hidden bg-secondary/30">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="font-mono text-5xl font-bold text-primary/15">
                    {post.title[0]}
                  </div>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                  <span className="rounded bg-primary/10 px-1.5 py-0.5 font-mono text-[10px] text-primary">
                    {post.category}
                  </span>
                </div>
                <h3 className="mb-2 font-semibold text-foreground transition-colors group-hover:text-primary">
                  {post.title}
                </h3>
                <p className="mb-4 flex-1 text-sm text-muted-foreground line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-1 font-mono text-xs text-primary">
                  Read More
                  <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </article>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="py-20 text-center text-muted-foreground">
            No blog posts yet. Check back soon.
          </div>
        )}
      </div>
    </section>
  )
}
