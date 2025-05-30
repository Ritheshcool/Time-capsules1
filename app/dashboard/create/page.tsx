import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { getCurrentUser } from "@/lib/actions"
import { DashboardHeader } from "@/components/dashboard-header"
import { CreateCapsuleForm } from "@/components/create-capsule-form"

export default async function CreateCapsulePage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader user={user} />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Dashboard</span>
            </Button>
          </Link>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Create a New Time Capsule</CardTitle>
              <CardDescription>
                Write a message to your future self or someone special. Choose when you want it delivered.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CreateCapsuleForm user={user} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
