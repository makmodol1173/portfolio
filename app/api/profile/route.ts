import { NextRequest, NextResponse } from "next/server"
import { readData, writeData } from "@/lib/data"
import { getSession } from "@/lib/auth"
import type { Profile } from "@/lib/types"

export async function GET() {
  const profile = await readData<Profile>("profile.json")
  return NextResponse.json({ success: true, data: profile })
}

export async function PUT(request: NextRequest) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const current = await readData<Profile>("profile.json")
    const updated = { ...current, ...body }
    await writeData("profile.json", updated)

    return NextResponse.json({ success: true, data: updated })
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request" }, { status: 400 })
  }
}
