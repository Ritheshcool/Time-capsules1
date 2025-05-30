import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Mail, Calendar, Shield } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Clock className="h-8 w-8 text-purple-600" />
            <h1 className="text-2xl font-bold text-gray-900">TimeCapsule</h1>
          </div>
          <nav className="flex items-center space-x-4">
            <Link href="/how-it-works" className="text-gray-600 hover:text-gray-900">
              How it Works
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900">
              About
            </Link>
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link href="/signup">
              <Button>Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Send Messages to Your <span className="text-purple-600">Future Self</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Create digital time capsules with messages, photos, and memories. Schedule them for delivery to yourself or
            loved ones in the future.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/signup">
              <Button size="lg" className="px-8 py-3">
                Create Your First Capsule
              </Button>
            </Link>
            <Link href="/how-it-works">
              <Button variant="outline" size="lg" className="px-8 py-3">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Why Choose TimeCapsule?</h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our platform makes it easy to create meaningful connections with your future self and preserve precious
            memories for years to come.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="text-center">
            <CardHeader>
              <Calendar className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <CardTitle>Schedule Delivery</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Choose any future date for your message to be delivered. Perfect for birthdays, anniversaries, or
                personal milestones.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Mail className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Email Delivery</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Receive your time capsules directly in your inbox when the scheduled date arrives. Never miss a memory.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <CardTitle>Secure & Private</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Your memories are encrypted and stored securely. Only you can access your personal time capsules.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Clock className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <CardTitle>Easy to Use</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Simple interface to create, manage, and schedule your digital time capsules in just a few clicks.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">Start Your Journey Through Time</h3>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already creating meaningful connections with their future selves. Your first
            time capsule is free!
          </p>
          <Link href="/signup">
            <Button size="lg" variant="secondary" className="px-8 py-3">
              Create Free Account
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Clock className="h-6 w-6" />
            <span className="text-lg font-semibold">TimeCapsule</span>
          </div>
          <p className="text-gray-400">© 2024 TimeCapsule. All rights reserved. Send love to your future self.</p>
        </div>
      </footer>
    </div>
  )
}
