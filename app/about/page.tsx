import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Clock, ArrowLeft, Heart, Shield, Zap } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Clock className="h-8 w-8 text-purple-600" />
            <h1 className="text-2xl font-bold text-gray-900">TimeCapsule</h1>
          </div>
          <Link href="/">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">About TimeCapsule</h2>
            <p className="text-xl text-gray-600">
              Connecting you with your future self through the power of digital time capsules
            </p>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-sm mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              TimeCapsule was created to help people build meaningful connections with their future selves and preserve
              precious memories for years to come. In our fast-paced digital world, we often forget to pause and reflect
              on our journey. Our platform provides a unique way to capture your thoughts, dreams, and experiences
              today, and rediscover them when you need them most.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-lg p-6 shadow-sm text-center">
              <Heart className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Built with Love</h4>
              <p className="text-gray-600">
                Every feature is designed with care to create meaningful experiences and lasting memories.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm text-center">
              <Shield className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Privacy First</h4>
              <p className="text-gray-600">
                Your memories are encrypted and secure. We never read your messages or share your data.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm text-center">
              <Zap className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Simple & Reliable</h4>
              <p className="text-gray-600">
                Easy to use interface with reliable delivery. Your time capsules will reach you when promised.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-sm mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Time Capsules Matter</h3>
            <div className="space-y-4 text-gray-600">
              <p>
                Time capsules have been used throughout history to preserve moments in time and share them with future
                generations. Digital time capsules take this concept further, allowing for personal reflection and
                growth.
              </p>
              <p>
                Research shows that writing to your future self can improve goal achievement, increase self-awareness,
                and provide emotional support during challenging times. TimeCapsule makes this practice accessible and
                convenient for everyone.
              </p>
              <p>
                Whether you're celebrating achievements, setting goals, or simply wanting to remember a special moment,
                TimeCapsule helps you create a bridge between your present and future self.
              </p>
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Start Your Journey</h3>
            <p className="text-gray-600 mb-6">
              Join thousands of users who are already creating meaningful connections with their future selves.
            </p>
            <Link href="/signup">
              <Button size="lg" className="px-8 py-3">
                Create Your First Time Capsule
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
