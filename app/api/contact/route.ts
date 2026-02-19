import { NextRequest, NextResponse } from "next/server"
import { readData, writeData, generateId } from "@/lib/data"

interface ContactMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  read: boolean
  createdAt: string
}

export async function GET() {
  const messages = await readData<ContactMessage[]>("messages.json")
  return NextResponse.json({ success: true, data: messages })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { success: false, error: "Name, email, and message are required" },
        { status: 400 }
      )
    }

    const messages = await readData<ContactMessage[]>("messages.json")

    const msg: ContactMessage = {
      id: generateId(),
      name: body.name,
      email: body.email,
      subject: body.subject || "",
      message: body.message,
      read: false,
      createdAt: new Date().toISOString(),
    }

    messages.push(msg)
    await writeData("messages.json", messages)

    return NextResponse.json({ success: true, data: { id: msg.id } }, { status: 201 })
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request" }, { status: 400 })
  }
}
