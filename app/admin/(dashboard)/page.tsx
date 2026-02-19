"use client"

import useSWR from "swr"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FolderKanban, FileText, Wrench, MessageSquare } from "lucide-react"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function AdminDashboard() {
  const { data: projectsData } = useSWR("/api/projects", fetcher)
  const { data: postsData } = useSWR("/api/posts", fetcher)
  const { data: skillsData } = useSWR("/api/skills", fetcher)
  const { data: messagesData } = useSWR("/api/contact", fetcher)

  const stats = [
    {
      label: "Projects",
      value: projectsData?.data?.length ?? 0,
      icon: FolderKanban,
      color: "text-[#00f0ff]",
    },
    {
      label: "Posts",
      value: postsData?.data?.length ?? 0,
      icon: FileText,
      color: "text-blue-400",
    },
    {
      label: "Skills",
      value: skillsData?.data?.length ?? 0,
      icon: Wrench,
      color: "text-emerald-400",
    },
    {
      label: "Messages",
      value: messagesData?.data?.length ?? 0,
      icon: MessageSquare,
      color: "text-amber-400",
    },
  ]

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-foreground">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <stat.icon className={cn("h-5 w-5", stat.color)} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ")
}
