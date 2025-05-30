"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Mail, Trash2 } from "lucide-react"
import { deleteCapsuleAction } from "@/lib/actions"
import type { Capsule } from "@/lib/types"

interface CapsuleCardProps {
  capsule: Capsule
}

export function CapsuleCard({ capsule }: CapsuleCardProps) {
  const deliveryDate = new Date(capsule.delivery_date)
  const isDelivered = capsule.status === "delivered"

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getDaysUntilDelivery = () => {
    const today = new Date()
    const diffTime = deliveryDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  async function handleDelete() {
    if (confirm("Are you sure you want to delete this time capsule?")) {
      await deleteCapsuleAction(capsule.id)
      window.location.reload()
    }
  }

  return (
    <Card className={isDelivered ? "opacity-75" : ""}>
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div className="flex-1">
          <CardTitle className="text-lg">{capsule.title}</CardTitle>
          <CardDescription className="mt-2">
            {capsule.message.length > 150 ? `${capsule.message.substring(0, 150)}...` : capsule.message}
          </CardDescription>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant={isDelivered ? "secondary" : "default"}>{isDelivered ? "Delivered" : "Pending"}</Badge>
          {!isDelivered && (
            <Button variant="ghost" size="sm" onClick={handleDelete}>
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(deliveryDate)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Mail className="h-4 w-4" />
              <span>{capsule.delivery_email}</span>
            </div>
          </div>
          {!isDelivered && (
            <div className="text-purple-600 font-medium">
              {getDaysUntilDelivery() > 0 ? `${getDaysUntilDelivery()} days to go` : "Delivering soon"}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
