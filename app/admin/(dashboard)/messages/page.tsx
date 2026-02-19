"use client"

import useSWR from "swr"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, Clock } from "lucide-react"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

interface ContactMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  read: boolean
  createdAt: string
}

export default function AdminMessagesPage() {
  const { data } = useSWR("/api/contact", fetcher)
  const messages: ContactMessage[] = data?.data || []

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Messages</h1>
        <Badge variant="secondary" className="font-mono">
          {messages.length} total
        </Badge>
      </div>

      <div className="flex flex-col gap-3">
        {messages.map((msg) => (
          <Card key={msg.id}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">
                  {msg.subject || "No subject"}
                </CardTitle>
                {!msg.read && (
                  <Badge className="bg-primary/20 text-primary">New</Badge>
                )}
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Mail className="h-3 w-3" />
                  {msg.name} ({msg.email})
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {new Date(msg.createdAt).toLocaleDateString()}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap text-sm text-foreground">
                {msg.message}
              </p>
            </CardContent>
          </Card>
        ))}
        {messages.length === 0 && (
          <p className="py-10 text-center text-muted-foreground">
            No messages yet.
          </p>
        )}
      </div>
    </div>
  )
}
