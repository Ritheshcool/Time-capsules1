export interface User {
  id: number
  email: string
  name: string
}

export interface Capsule {
  id: number
  user_id: number
  title: string
  message: string
  delivery_date: string
  delivery_email?: string
  status: "pending" | "delivered" | "failed"
  created_at: string
  delivered_at?: string
}

export interface CreateCapsuleData {
  title: string
  message: string
  delivery_date: string
  delivery_email?: string
}
