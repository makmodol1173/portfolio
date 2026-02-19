import { NextRequest, NextResponse } from "next/server"
import { readData, writeData, generateId } from "@/lib/data"
import { getSession } from "@/lib/auth"
import type { Project } from "@/lib/types"

export async function GET() {
  const projects = await readData<Project[]>("projects.json")
  return NextResponse.json({ success: true, data: projects })
}

export async function POST(request: NextRequest) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const projects = await readData<Project[]>("projects.json")

    const project: Project = {
      id: generateId(),
      title: body.title || "",
      description: body.description || "",
      longDescription: body.longDescription || "",
      techStack: body.techStack || [],
      thumbnail: body.thumbnail || "",
      images: body.images || [],
      githubLink: body.githubLink || "",
      liveLink: body.liveLink || "",
      category: body.category || "web",
      featured: body.featured || false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    projects.push(project)
    await writeData("projects.json", projects)

    return NextResponse.json({ success: true, data: project }, { status: 201 })
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request" }, { status: 400 })
  }
}
