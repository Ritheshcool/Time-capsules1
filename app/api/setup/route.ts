import { NextResponse } from "next/server"
import { sql } from "@/lib/db"
import { hashPassword } from "@/lib/auth"

export async function GET() {
  try {
    // Create test user
    const email = "test@example.com"
    const password = "password123"
    const name = "Test User"

    // Check if user already exists
    const existingUser = await sql`SELECT id FROM users WHERE email = ${email}`

    if (existingUser.length === 0) {
      const hashedPassword = await hashPassword(password)

      await sql`
        INSERT INTO users (email, password_hash, name)
        VALUES (${email}, ${hashedPassword}, ${name})
      `

      return NextResponse.json({
        success: true,
        message: "Test user created successfully",
        credentials: {
          email,
          password: "password123",
        },
      })
    } else {
      return NextResponse.json({
        success: true,
        message: "Test user already exists",
        credentials: {
          email,
          password: "password123",
        },
      })
    }
  } catch (error) {
    console.error("Setup error:", error)
    return NextResponse.json({ success: false, error: "Setup failed" }, { status: 500 })
  }
}
