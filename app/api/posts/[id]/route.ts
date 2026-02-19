import { NextRequest, NextResponse } from "next/server"
import { readData, writeData } from "@/lib/data"
import { getSession } from "@/lib/auth"
import type { Post } from "@/lib/types"

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const posts = await readData<Post[]>("posts.json")
  const post = posts.find((p) => p.id === id)

  if (!post) {
    return NextResponse.json({ success: false, error: "Not found" }, { status: 404 })
  }
  return NextResponse.json({ success: true, data: post })
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params
  const body = await req.json()
  const posts = await readData<Post[]>("posts.json")
  const index = posts.findIndex((p) => p.id === id)

  if (index === -1) {
    return NextResponse.json({ success: false, error: "Not found" }, { status: 404 })
  }

  posts[index] = { ...posts[index], ...body, id, updatedAt: new Date().toISOString() }
  await writeData("posts.json", posts)

  return NextResponse.json({ success: true, data: posts[index] })
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params
  const posts = await readData<Post[]>("posts.json")
  const filtered = posts.filter((p) => p.id !== id)

  if (filtered.length === posts.length) {
    return NextResponse.json({ success: false, error: "Not found" }, { status: 404 })
  }

  await writeData("posts.json", filtered)
  return NextResponse.json({ success: true })
}
