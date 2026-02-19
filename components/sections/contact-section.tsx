"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Mail, MapPin } from "lucide-react"

export function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  )
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("sending")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus("sent")
        setForm({ name: "", email: "", subject: "", message: "" })
        setTimeout(() => setStatus("idle"), 4000)
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  return (
    <section id="contact" ref={sectionRef} className="relative py-32">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-12 flex flex-col items-center text-center">
          <span className="mb-3 font-mono text-xs uppercase tracking-widest text-primary">
            Contact
          </span>
          <h2 className="mb-6 text-balance text-4xl font-bold text-foreground md:text-5xl">
            Get in <span className="text-primary">Touch</span>
          </h2>
          <p className="max-w-xl text-pretty text-muted-foreground">
            Have a project in mind? Let&apos;s work together to create something
            extraordinary.
          </p>
        </div>

        <div
          className="grid gap-8 md:grid-cols-3"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          {/* Info */}
          <div className="flex flex-col gap-6 md:col-span-1">
            <div className="glass-panel p-5">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Mail className="h-5 w-5" />
              </div>
              <h3 className="mb-1 font-mono text-sm font-semibold text-foreground">
                Email
              </h3>
              <p className="text-sm text-muted-foreground">
                makmodol1173@gmail.com
              </p>
            </div>
            <div className="glass-panel p-5">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <MapPin className="h-5 w-5" />
              </div>
              <h3 className="mb-1 font-mono text-sm font-semibold text-foreground">
                Location
              </h3>
              <p className="text-sm text-muted-foreground">
                Kishoreganj, Dhaka, Bangladesh
              </p>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="glass-panel flex flex-col gap-4 p-6 md:col-span-2"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="mb-1.5 block font-mono text-xs text-muted-foreground"
                >
                  Name
                </label>
                <input
                  id="name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-lg border border-border bg-background/50 px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block font-mono text-xs text-muted-foreground"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-lg border border-border bg-background/50 px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="subject"
                className="mb-1.5 block font-mono text-xs text-muted-foreground"
              >
                Subject
              </label>
              <input
                id="subject"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full rounded-lg border border-border bg-background/50 px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary"
                placeholder="Project inquiry"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="mb-1.5 block font-mono text-xs text-muted-foreground"
              >
                Message
              </label>
              <textarea
                id="message"
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full resize-none rounded-lg border border-border bg-background/50 px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary"
                placeholder="Tell me about your project..."
              />
            </div>
            <button
              type="submit"
              disabled={status === "sending"}
              className="flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-mono text-sm font-medium text-primary-foreground transition-all hover:opacity-90 disabled:opacity-50"
            >
              {status === "sending" ? (
                "Sending..."
              ) : status === "sent" ? (
                "Message Sent!"
              ) : (
                <>
                  Send Message
                  <Send className="h-4 w-4" />
                </>
              )}
            </button>
            {status === "error" && (
              <p className="text-center text-sm text-destructive-foreground">
                Something went wrong. Please try again.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
