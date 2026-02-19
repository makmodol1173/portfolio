"use client"

import { Github, Linkedin, Twitter, Facebook, Instagram } from "lucide-react"

const socialLinks = [
  { icon: Github, href: "https://github.com/makmodol1173", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/makmudul-hasan-rabbi", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com/ShahMoaz1", label: "Twitter" },
  { icon: Facebook, href: "https://facebook.com/shah.moaz10", label: "Facebook" },
  { icon: Instagram, href: "https://instagram.com/shah_moaz", label: "Instagram" },
]

export function Footer() {
  return (
    <footer className="border-t border-border/50 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 md:flex-row md:justify-between">
        <div className="flex flex-col items-center gap-2 md:items-start">
          <span className="font-mono text-sm font-bold text-primary">
            <img
            src="https://see.fontimg.com/api/rf5/e9j06/NTcwZDdiY2FmZmM5NGEyN2E2YmMwMzVlYWFlMWQ4OTQub3Rm/TWFrbXVkdWwgSCBSYWJiaQ/maellen.png?r=fs&h=56&w=1250&fg=4DF6F4&bg=6BF8FA&tb=1&s=45"
            alt="Signature"
            className="h-7 w-auto"
          />
          </span>
          <p className="text-xs text-muted-foreground">
            Crafted with precision and passion.
          </p>
        </div>

        <div className="flex items-center gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-all hover:border-primary/50 hover:text-primary"
              aria-label={link.label}
            >
              <link.icon className="h-4 w-4" />
            </a>
          ))}
        </div>

        <p className="text-xs text-muted-foreground">
          {new Date().getFullYear()} Makmudul Hasan Rabbi. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
