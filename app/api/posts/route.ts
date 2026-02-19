import { NextRequest, NextResponse } from "next/server"
import { readData, writeData, generateId } from "@/lib/data"
import { getSession } from "@/lib/auth"
import type { Post } from "@/lib/types"

export async function GET() {
  const posts = await readData<Post[]>("posts.json")
  return NextResponse.json({ success: true, data: posts })
}

export async function POST(request: NextRequest) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const posts = await readData<Post[]>("posts.json")

    const post: Post = {
      id: generateId(),
      title: body.title || "",
      content: body.content || "",
      excerpt: body.excerpt || "",
      tags: body.tags || [],
      category: body.category || "general",
      published: body.published ?? false,
      coverImage: body.coverImage || "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    posts.push(post)
    await writeData("posts.json", posts)

    return NextResponse.json({ success: true, data: post }, { status: 201 })
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request" }, { status: 400 })
  }
}
