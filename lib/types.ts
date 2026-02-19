export interface Project {
  id: string
  title: string
  description: string
  longDescription?: string
  techStack: string[]
  thumbnail: string
  images: string[]
  githubLink?: string
  liveLink?: string
  category: string
  featured: boolean
  createdAt: string
  updatedAt: string
}

export interface Post {
  id: string
  title: string
  content: string
  excerpt: string
  tags: string[]
  category: string
  published: boolean
  coverImage?: string
  createdAt: string
  updatedAt: string
}

export interface Skill {
  id: string
  name: string
  level: number
  category: string
  icon?: string
}

export interface Profile {
  name: string
  title: string
  bio: string
  avatar: string
  email: string
  location: string
  socialLinks: {
    github?: string
    linkedin?: string
    twitter?: string
    website?: string
  }
  resumeUrl?: string
}

export interface User {
  id: string
  username: string
  passwordHash: string
}

export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
}
