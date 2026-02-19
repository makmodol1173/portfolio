"use client"

import { useState, useEffect } from "react"
import useSWR, { mutate } from "swr"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Save } from "lucide-react"
import type { Profile } from "@/lib/types"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function AdminProfilePage() {
  const { data } = useSWR("/api/profile", fetcher)
  const [form, setForm] = useState<Profile | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (data?.data) setForm(data.data)
  }, [data])

  const handleSave = async () => {
    if (!form) return
    setSaving(true)
    await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
    mutate("/api/profile")
    setSaving(false)
  }

  if (!form) return <div className="text-muted-foreground">Loading...</div>

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Profile</h1>
        <Button onClick={handleSave} disabled={saving}>
          <Save className="mr-2 h-4 w-4" />
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Basic Info</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label>Name</Label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Title</Label>
              <Input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Email</Label>
              <Input
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Location</Label>
              <Input
                value={form.location}
                onChange={(e) =>
                  setForm({ ...form, location: e.target.value })
                }
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Social Links</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label>GitHub</Label>
              <Input
                value={form.socialLinks?.github || ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    socialLinks: { ...form.socialLinks, github: e.target.value },
                  })
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>LinkedIn</Label>
              <Input
                value={form.socialLinks?.linkedin || ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    socialLinks: {
                      ...form.socialLinks,
                      linkedin: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Twitter</Label>
              <Input
                value={form.socialLinks?.twitter || ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    socialLinks: {
                      ...form.socialLinks,
                      twitter: e.target.value,
                    },
                  })
                }
              />
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Bio</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              rows={6}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
