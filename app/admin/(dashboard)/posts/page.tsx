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
import type { Post } from "@/lib/types"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

const emptyPost = {
  title: "",
  content: "",
  excerpt: "",
  tags: "",
  category: "general",
  published: false,
}

export default function AdminPostsPage() {
  const { data } = useSWR("/api/posts", fetcher)
  const [open, setOpen] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [form, setForm] = useState(emptyPost)

  const posts: Post[] = data?.data || []

  const handleSave = async () => {
    const payload = {
      ...form,
      tags: form.tags.split(",").map((s: string) => s.trim()).filter(Boolean),
    }

    if (editId) {
      await fetch(`/api/posts/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
    } else {
      await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
    }

    mutate("/api/posts")
    setOpen(false)
    setEditId(null)
    setForm(emptyPost)
  }

  const handleEdit = (post: Post) => {
    setEditId(post.id)
    setForm({
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      tags: post.tags.join(", "),
      category: post.category,
      published: post.published,
    })
    setOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return
    await fetch(`/api/posts/${id}`, { method: "DELETE" })
    mutate("/api/posts")
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Posts</h1>
        <Dialog
          open={open}
          onOpenChange={(o) => {
            setOpen(o)
            if (!o) {
              setEditId(null)
              setForm(emptyPost)
            }
          }}
        >
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>{editId ? "Edit Post" : "New Post"}</DialogTitle>
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
                <Label>Excerpt</Label>
                <Textarea
                  value={form.excerpt}
                  onChange={(e) =>
                    setForm({ ...form, excerpt: e.target.value })
                  }
                  rows={2}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Content (Markdown)</Label>
                <Textarea
                  value={form.content}
                  onChange={(e) =>
                    setForm({ ...form, content: e.target.value })
                  }
                  rows={10}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label>Tags (comma separated)</Label>
                  <Input
                    value={form.tags}
                    onChange={(e) =>
                      setForm({ ...form, tags: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Category</Label>
                  <Input
                    value={form.category}
                    onChange={(e) =>
                      setForm({ ...form, category: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="published"
                  checked={form.published}
                  onCheckedChange={(checked) =>
                    setForm({ ...form, published: !!checked })
                  }
                />
                <Label htmlFor="published">Published</Label>
              </div>
              <Button onClick={handleSave}>
                {editId ? "Update" : "Create"} Post
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col gap-3">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardHeader className="flex flex-row items-center justify-between py-3">
              <div>
                <CardTitle className="text-base">{post.title}</CardTitle>
                <p className="mt-1 text-sm text-muted-foreground">
                  {post.category} |{" "}
                  {post.published ? (
                    <span className="text-emerald-400">Published</span>
                  ) : (
                    <span className="text-amber-400">Draft</span>
                  )}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEdit(post)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(post.id)}
                >
                  <Trash2 className="h-4 w-4 text-destructive-foreground" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {post.excerpt}
              </p>
            </CardContent>
          </Card>
        ))}
        {posts.length === 0 && (
          <p className="py-10 text-center text-muted-foreground">
            No posts yet. Write your first blog post.
          </p>
        )}
      </div>
    </div>
  )
}
