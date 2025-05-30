import bcryptjs from "bcryptjs"
import { sql } from "./db"

export interface User {
  id: number
  email: string
  name: string
}

export interface Session {
  id: string
  user_id: number
  expires_at: Date
}

export async function hashPassword(password: string): Promise<string> {
  return bcryptjs.hash(password, 12)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcryptjs.compare(password, hashedPassword)
}

export function generateSessionId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

export async function createSession(userId: number): Promise<string> {
  const sessionId = generateSessionId()
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days

  await sql`
    INSERT INTO sessions (id, user_id, expires_at)
    VALUES (${sessionId}, ${userId}, ${expiresAt})
  `

  return sessionId
}

export async function getSessionUser(sessionId: string): Promise<User | null> {
  const result = await sql`
    SELECT u.id, u.email, u.name
    FROM users u
    JOIN sessions s ON u.id = s.user_id
    WHERE s.id = ${sessionId} AND s.expires_at > NOW()
  `

  return (result[0] as User) || null
}

export async function deleteSession(sessionId: string): Promise<void> {
  await sql`DELETE FROM sessions WHERE id = ${sessionId}`
}

export async function createUser(email: string, password: string, name: string) {
  const hashedPassword = await hashPassword(password)

  const result = await sql`
    INSERT INTO users (email, password_hash, name)
    VALUES (${email}, ${hashedPassword}, ${name})
    RETURNING id, email, name
  `

  return result[0] as User
}

export async function authenticateUser(email: string, password: string): Promise<User | null> {
  const result = await sql`
    SELECT id, email, name, password_hash
    FROM users
    WHERE email = ${email}
  `

  if (result.length === 0) return null

  const user = result[0]
  const isValid = await verifyPassword(password, user.password_hash)

  if (!isValid) return null

  return { id: user.id, email: user.email, name: user.name }
}

export async function getUserById(id: number): Promise<User | null> {
  const result = await sql`
    SELECT id, email, name
    FROM users
    WHERE id = ${id}
  `

  return (result[0] as User) || null
}
