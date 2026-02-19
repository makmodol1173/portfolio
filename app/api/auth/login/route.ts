import { NextRequest, NextResponse } from "next/server"
import { readData } from "@/lib/data"
import { comparePassword, signToken, setSessionCookie } from "@/lib/auth"
import type { User } from "@/lib/types"

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: "Username and password are required" },
        { status: 400 }
      )
    }

    const users = await readData<User[]>("users.json")
    const user = users.find((u) => u.username === username)

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Invalid credentials" },
        { status: 401 }
      )
    }

    const valid = await comparePassword(password, user.passwordHash)
    if (!valid) {
      return NextResponse.json(
        { success: false, error: "Invalid credentials" },
        { status: 401 }
      )
    }

    const token = await signToken({ userId: user.id, username: user.username })
    await setSessionCookie(token)

    return NextResponse.json({
      success: true,
      data: { userId: user.id, username: user.username },
    })
  } catch {
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    )
  }
}
