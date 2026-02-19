import { NextRequest, NextResponse } from "next/server"
import { readData, writeData } from "@/lib/data"
import { getSession } from "@/lib/auth"
import type { Project } from "@/lib/types"

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const projects = await readData<Project[]>("projects.json")
  const project = projects.find((p) => p.id === id)

  if (!project) {
    return NextResponse.json({ success: false, error: "Not found" }, { status: 404 })
  }
  return NextResponse.json({ success: true, data: project })
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params
  const body = await req.json()
  const projects = await readData<Project[]>("projects.json")
  const index = projects.findIndex((p) => p.id === id)

  if (index === -1) {
    return NextResponse.json({ success: false, error: "Not found" }, { status: 404 })
  }

  projects[index] = { ...projects[index], ...body, id, updatedAt: new Date().toISOString() }
  await writeData("projects.json", projects)

  return NextResponse.json({ success: true, data: projects[index] })
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params
  const projects = await readData<Project[]>("projects.json")
  const filtered = projects.filter((p) => p.id !== id)

  if (filtered.length === projects.length) {
    return NextResponse.json({ success: false, error: "Not found" }, { status: 404 })
  }

  await writeData("projects.json", filtered)
  return NextResponse.json({ success: true })
}
