"use client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createCapsuleAction } from "@/lib/actions"
import { useActionState } from "react"
import type { User } from "@/lib/types"

interface CreateCapsuleFormProps {
  user: User
}

export function CreateCapsuleForm({ user }: CreateCapsuleFormProps) {
  const router = useRouter()
  const [state, formAction, isPending] = useActionState(createCapsuleAction, null)

  useEffect(() => {
    if (state?.success && state?.redirect) {
      router.push(state.redirect)
    }
  }, [state, router])

  // Get tomorrow's date as minimum date
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const minDate = tomorrow.toISOString().split("T")[0]

  return (
    <form action={formAction} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Capsule Title</Label>
        <Input id="title" name="title" placeholder="e.g., Birthday wishes for my 30th" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Your Message</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Write your message here... What do you want to remember? What hopes do you have for the future?"
          rows={8}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="delivery_date">Delivery Date</Label>
        <Input id="delivery_date" name="delivery_date" type="date" min={minDate} required />
        <p className="text-sm text-gray-600">Choose when you want to receive this time capsule</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="delivery_email">Delivery Email (Optional)</Label>
        <Input
          id="delivery_email"
          name="delivery_email"
          type="email"
          placeholder={user.email}
          defaultValue={user.email}
        />
        <p className="text-sm text-gray-600">Leave blank to use your account email ({user.email})</p>
      </div>

      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}

      <div className="flex space-x-4">
        <Button type="submit" className="flex-1" disabled={isPending}>
          {isPending ? "Creating..." : "Create Time Capsule"}
        </Button>
        <Link href="/dashboard">
          <Button variant="outline">Cancel</Button>
        </Link>
      </div>
    </form>
  )
}
