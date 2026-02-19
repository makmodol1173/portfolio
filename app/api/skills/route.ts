import { NextRequest, NextResponse } from "next/server"
import { readData, writeData, generateId } from "@/lib/data"
import { getSession } from "@/lib/auth"
import type { Skill } from "@/lib/types"

export async function GET() {
  const skills = await readData<Skill[]>("skills.json")
  return NextResponse.json({ success: true, data: skills })
}

export async function POST(request: NextRequest) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const skills = await readData<Skill[]>("skills.json")

    const skill: Skill = {
      id: generateId(),
      name: body.name || "",
      level: body.level ?? 50,
      category: body.category || "general",
      icon: body.icon || "",
    }

    skills.push(skill)
    await writeData("skills.json", skills)

    return NextResponse.json({ success: true, data: skill }, { status: 201 })
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request" }, { status: 400 })
  }
}

export async function PUT(request: NextRequest) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const skills = await readData<Skill[]>("skills.json")
    const index = skills.findIndex((s) => s.id === body.id)

    if (index === -1) {
      return NextResponse.json({ success: false, error: "Not found" }, { status: 404 })
    }

    skills[index] = { ...skills[index], ...body }
    await writeData("skills.json", skills)

    return NextResponse.json({ success: true, data: skills[index] })
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request" }, { status: 400 })
  }
}

export async function DELETE(request: NextRequest) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")

  if (!id) {
    return NextResponse.json({ success: false, error: "ID required" }, { status: 400 })
  }

  const skills = await readData<Skill[]>("skills.json")
  const filtered = skills.filter((s) => s.id !== id)

  if (filtered.length === skills.length) {
    return NextResponse.json({ success: false, error: "Not found" }, { status: 404 })
  }

  await writeData("skills.json", filtered)
  return NextResponse.json({ success: true })
}
