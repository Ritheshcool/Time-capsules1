import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Edit, Calendar, Mail, ArrowLeft } from "lucide-react"

export default function HowItWorksPage() {
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How TimeCapsule Works</h2>
            <p className="text-xl text-gray-600">Creating and scheduling your digital memories is simple and secure</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-purple-600">1</span>
                </div>
                <Edit className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <CardTitle>Write Your Message</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Create a meaningful message, memory, or note to your future self or loved ones.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-blue-600">2</span>
                </div>
                <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <CardTitle>Choose Delivery Date</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Select any future date when you want your time capsule to be delivered.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-green-600">3</span>
                </div>
                <Clock className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <CardTitle>We Store It Safely</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Your message is encrypted and stored securely until the delivery date arrives.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-orange-600">4</span>
                </div>
                <Mail className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <CardTitle>Receive Your Memory</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  On the scheduled date, your time capsule is delivered directly to your email.
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-sm">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Perfect For</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Personal Reflection</h4>
                <ul className="text-gray-600 space-y-1">
                  <li>• Birthday messages to your future self</li>
                  <li>• New Year resolutions check-ins</li>
                  <li>• Milestone celebrations</li>
                  <li>• Personal growth tracking</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Special Occasions</h4>
                <ul className="text-gray-600 space-y-1">
                  <li>• Anniversary surprises</li>
                  <li>• Graduation congratulations</li>
                  <li>• Wedding day memories</li>
                  <li>• Baby milestone messages</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Start?</h3>
            <p className="text-gray-600 mb-6">
              Create your first time capsule today and send a message to your future self!
            </p>
            <Link href="/signup">
              <Button size="lg" className="px-8 py-3">
                Get Started Free
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
