"use client"

import { useState } from "react"
import useSWR, { mutate } from "swr"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Slider } from "@/components/ui/slider"
import { Plus, Pencil, Trash2 } from "lucide-react"
import type { Skill } from "@/lib/types"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

const emptySkill = { name: "", level: 50, category: "frontend", icon: "" }

export default function AdminSkillsPage() {
  const { data } = useSWR("/api/skills", fetcher)
  const [open, setOpen] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [form, setForm] = useState(emptySkill)

  const skills: Skill[] = data?.data || []

  const handleSave = async () => {
    if (editId) {
      await fetch("/api/skills", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, id: editId }),
      })
    } else {
      await fetch("/api/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
    }

    mutate("/api/skills")
    setOpen(false)
    setEditId(null)
    setForm(emptySkill)
  }

  const handleEdit = (skill: Skill) => {
    setEditId(skill.id)
    setForm({
      name: skill.name,
      level: skill.level,
      category: skill.category,
      icon: skill.icon || "",
    })
    setOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this skill?")) return
    await fetch(`/api/skills?id=${id}`, { method: "DELETE" })
    mutate("/api/skills")
  }

  const grouped = skills.reduce(
    (acc, s) => {
      const cat = s.category || "other"
      if (!acc[cat]) acc[cat] = []
      acc[cat].push(s)
      return acc
    },
    {} as Record<string, Skill[]>
  )

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Skills</h1>
        <Dialog
          open={open}
          onOpenChange={(o) => {
            setOpen(o)
            if (!o) {
              setEditId(null)
              setForm(emptySkill)
            }
          }}
        >
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Skill
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editId ? "Edit Skill" : "New Skill"}
              </DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4 pt-4">
              <div className="flex flex-col gap-2">
                <Label>Name</Label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Category</Label>
                <Input
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                  placeholder="frontend, backend, tools, design"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>
                  Level: {form.level}%
                </Label>
                <Slider
                  value={[form.level]}
                  onValueChange={(v) => setForm({ ...form, level: v[0] })}
                  min={0}
                  max={100}
                  step={5}
                />
              </div>
              <Button onClick={handleSave}>
                {editId ? "Update" : "Create"} Skill
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {Object.entries(grouped).map(([category, catSkills]) => (
        <div key={category} className="mb-6">
          <h2 className="mb-3 font-mono text-sm font-semibold capitalize text-muted-foreground">
            {category}
          </h2>
          <div className="flex flex-col gap-2">
            {catSkills.map((skill) => (
              <Card key={skill.id}>
                <CardHeader className="flex flex-row items-center justify-between py-2">
                  <CardTitle className="text-sm">{skill.name}</CardTitle>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-muted-foreground">
                      {skill.level}%
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => handleEdit(skill)}
                    >
                      <Pencil className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => handleDelete(skill.id)}
                    >
                      <Trash2 className="h-3 w-3 text-destructive-foreground" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="py-0 pb-3">
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}

      {skills.length === 0 && (
        <p className="py-10 text-center text-muted-foreground">
          No skills yet. Add your tech stack.
        </p>
      )}
    </div>
  )
}
