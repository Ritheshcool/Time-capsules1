import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Clock } from "lucide-react"
import { logoutAction } from "@/lib/actions"
import type { User } from "@/lib/types"

interface DashboardHeaderProps {
  user: User
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  return (
    <header className="bg-white border-b sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <Clock className="h-8 w-8 text-purple-600" />
            <h1 className="text-2xl font-bold text-gray-900">TimeCapsule</h1>
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-gray-600 hidden md:inline-block">Welcome, {user.name}</span>
          <form action={logoutAction}>
            <Button variant="outline" type="submit">
              Logout
            </Button>
          </form>
        </div>
      </div>
    </header>
  )
}
