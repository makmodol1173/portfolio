"use client"

import { useState } from "react"
import useSWR, { mutate } from "swr"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Pencil, Trash2 } from "lucide-react"
import type { Project } from "@/lib/types"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

const emptyProject = {
  title: "",
  description: "",
  longDescription: "",
  techStack: "",
  githubLink: "",
  liveLink: "",
  category: "web",
  featured: false,
}

export default function AdminProjectsPage() {
  const { data } = useSWR("/api/projects", fetcher)
  const [open, setOpen] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [form, setForm] = useState(emptyProject)

  const projects: Project[] = data?.data || []

  const handleSave = async () => {
    const payload = {
      ...form,
      techStack: form.techStack.split(",").map((s: string) => s.trim()).filter(Boolean),
    }

    if (editId) {
      await fetch(`/api/projects/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
    } else {
      await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
    }

    mutate("/api/projects")
    setOpen(false)
    setEditId(null)
    setForm(emptyProject)
  }

  const handleEdit = (project: Project) => {
    setEditId(project.id)
    setForm({
      title: project.title,
      description: project.description,
      longDescription: project.longDescription || "",
      techStack: project.techStack.join(", "),
      githubLink: project.githubLink || "",
      liveLink: project.liveLink || "",
      category: project.category,
      featured: project.featured,
    })
    setOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return
    await fetch(`/api/projects/${id}`, { method: "DELETE" })
    mutate("/api/projects")
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Projects</h1>
        <Dialog
          open={open}
          onOpenChange={(o) => {
            setOpen(o)
            if (!o) {
              setEditId(null)
              setForm(emptyProject)
            }
          }}
        >
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>
                {editId ? "Edit Project" : "New Project"}
              </DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4 pt-4">
              <div className="flex flex-col gap-2">
                <Label>Title</Label>
                <Input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Description</Label>
                <Textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Tech Stack (comma separated)</Label>
                <Input
                  value={form.techStack}
                  onChange={(e) =>
                    setForm({ ...form, techStack: e.target.value })
                  }
                  placeholder="React, Next.js, TypeScript"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label>Category</Label>
                  <Input
                    value={form.category}
                    onChange={(e) =>
                      setForm({ ...form, category: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>GitHub Link</Label>
                  <Input
                    value={form.githubLink}
                    onChange={(e) =>
                      setForm({ ...form, githubLink: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label>Live Link</Label>
                <Input
                  value={form.liveLink}
                  onChange={(e) =>
                    setForm({ ...form, liveLink: e.target.value })
                  }
                />
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="featured"
                  checked={form.featured}
                  onCheckedChange={(checked) =>
                    setForm({ ...form, featured: !!checked })
                  }
                />
                <Label htmlFor="featured">Featured</Label>
              </div>
              <Button onClick={handleSave}>
                {editId ? "Update" : "Create"} Project
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col gap-3">
        {projects.map((project) => (
          <Card key={project.id}>
            <CardHeader className="flex flex-row items-center justify-between py-3">
              <div>
                <CardTitle className="text-base">{project.title}</CardTitle>
                <p className="mt-1 text-sm text-muted-foreground">
                  {project.category}
                  {project.featured && " | Featured"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEdit(project)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(project.id)}
                >
                  <Trash2 className="h-4 w-4 text-destructive-foreground" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {project.description}
              </p>
              <div className="mt-2 flex flex-wrap gap-1">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded bg-secondary px-1.5 py-0.5 text-xs text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
        {projects.length === 0 && (
          <p className="py-10 text-center text-muted-foreground">
            No projects yet. Add your first project.
          </p>
        )}
      </div>
    </div>
  )
}
