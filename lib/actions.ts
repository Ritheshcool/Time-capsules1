"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { sql } from "./db"
import { createUser, authenticateUser, createSession, getSessionUser, deleteSession } from "./auth"
import type { Capsule } from "./types"

export async function signupAction(prevState: any, formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!name || !email || !password) {
    return { error: "All fields are required" }
  }

  if (password.length < 6) {
    return { error: "Password must be at least 6 characters" }
  }

  try {
    // Check if user already exists
    const existingUser = await sql`
      SELECT id FROM users WHERE email = ${email}
    `

    if (existingUser.length > 0) {
      return { error: "User with this email already exists" }
    }

    const user = await createUser(email, password, name)
    const sessionId = await createSession(user.id)

    cookies().set("session-id", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return { success: true, redirect: "/dashboard" }
  } catch (error) {
    console.error("Signup error:", error)
    return { error: "Failed to create account" }
  }
}

export async function loginAction(prevState: any, formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password) {
    return { error: "Email and password are required" }
  }

  try {
    const user = await authenticateUser(email, password)

    if (!user) {
      return { error: "Invalid email or password" }
    }

    const sessionId = await createSession(user.id)

    cookies().set("session-id", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return { success: true, redirect: "/dashboard" }
  } catch (error) {
    console.error("Login error:", error)
    return { error: "Failed to login" }
  }
}

export async function logoutAction() {
  const sessionId = cookies().get("session-id")?.value

  if (sessionId) {
    try {
      await deleteSession(sessionId)
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  cookies().delete("session-id")
  redirect("/")
}

export async function getCurrentUser() {
  const sessionId = cookies().get("session-id")?.value

  if (!sessionId) return null

  return getSessionUser(sessionId)
}

export async function createCapsuleAction(prevState: any, formData: FormData) {
  const user = await getCurrentUser()
  if (!user) {
    return { error: "Not authenticated", redirect: "/login" }
  }

  const title = formData.get("title") as string
  const message = formData.get("message") as string
  const delivery_date = formData.get("delivery_date") as string
  const delivery_email = (formData.get("delivery_email") as string) || user.email

  if (!title || !message || !delivery_date) {
    return { error: "Title, message, and delivery date are required" }
  }

  const deliveryDate = new Date(delivery_date)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  if (deliveryDate <= today) {
    return { error: "Delivery date must be in the future" }
  }

  try {
    await sql`
      INSERT INTO capsules (user_id, title, message, delivery_date, delivery_email)
      VALUES (${user.id}, ${title}, ${message}, ${delivery_date}, ${delivery_email})
    `

    return { success: true, redirect: "/dashboard" }
  } catch (error) {
    console.error("Create capsule error:", error)
    return { error: "Failed to create capsule" }
  }
}

export async function getUserCapsules(): Promise<Capsule[]> {
  const user = await getCurrentUser()
  if (!user) return []

  try {
    const result = await sql`
      SELECT * FROM capsules 
      WHERE user_id = ${user.id}
      ORDER BY delivery_date ASC
    `

    return result as Capsule[]
  } catch (error) {
    console.error("Get capsules error:", error)
    return []
  }
}

export async function deleteCapsuleAction(capsuleId: number) {
  const user = await getCurrentUser()
  if (!user) {
    return { error: "Not authenticated", redirect: "/login" }
  }

  try {
    await sql`
      DELETE FROM capsules 
      WHERE id = ${capsuleId} AND user_id = ${user.id}
    `

    return { success: true }
  } catch (error) {
    console.error("Delete capsule error:", error)
    return { error: "Failed to delete capsule" }
  }
}
