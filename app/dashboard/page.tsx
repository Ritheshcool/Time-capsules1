import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Calendar, Mail } from "lucide-react"
import { getCurrentUser, getUserCapsules } from "@/lib/actions"
import { CapsuleCard } from "@/components/capsule-card"
import { DashboardHeader } from "@/components/dashboard-header"

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  const capsules = await getUserCapsules()
  const pendingCapsules = capsules.filter((c) => c.status === "pending")
  const deliveredCapsules = capsules.filter((c) => c.status === "delivered")

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader user={user} />

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Capsules</CardTitle>
              <div className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{capsules.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingCapsules.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Delivered</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{deliveredCapsules.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Create New Capsule Button */}
        <div className="mb-8">
          <Link href="/dashboard/create">
            <Button size="lg" className="flex items-center space-x-2">
              <Plus className="h-5 w-5" />
              <span>Create New Time Capsule</span>
            </Button>
          </Link>
        </div>

        {/* Capsules List */}
        <div className="space-y-6">
          {pendingCapsules.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Pending Capsules</h2>
              <div className="grid gap-4">
                {pendingCapsules.map((capsule) => (
                  <CapsuleCard key={capsule.id} capsule={capsule} />
                ))}
              </div>
            </div>
          )}

          {deliveredCapsules.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Delivered Capsules</h2>
              <div className="grid gap-4">
                {deliveredCapsules.map((capsule) => (
                  <CapsuleCard key={capsule.id} capsule={capsule} />
                ))}
              </div>
            </div>
          )}

          {capsules.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <div className="h-16 w-16 text-gray-400 mx-auto mb-4">⏰</div>
                <CardTitle className="mb-2">No Time Capsules Yet</CardTitle>
                <CardDescription className="mb-4">
                  Create your first time capsule to send a message to your future self!
                </CardDescription>
                <Link href="/dashboard/create">
                  <Button>Create Your First Capsule</Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
