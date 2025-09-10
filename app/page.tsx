import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="flex items-center justify-between p-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-ivote-primary rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">i</span>
          </div>
          <span className="text-2xl font-bold text-gray-800">VOTE</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/about" className="text-gray-600 hover:text-gray-800">
            About
          </Link>
          <Link href="/contact" className="text-gray-600 hover:text-gray-800">
            Contact Us
          </Link>
          <Link href="/faq" className="text-gray-600 hover:text-gray-800">
            FAQs
          </Link>
          <Link href="/login">
            <Button
              variant="outline"
              className="border-ivote-primary text-ivote-primary hover:bg-ivote-primary hover:text-white bg-transparent"
            >
              Log In
            </Button>
          </Link>
          <Link href="/register">
            <Button className="bg-ivote-primary hover:bg-ivote-primary/90 text-white">Register</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <Card className="p-12 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl font-bold text-gray-800 leading-tight">
                  Start voting in <span className="text-ivote-primary">minutes</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Polling made easy for all types of events. Manage polls and outcomes with our secure, transparent
                  voting platform.
                </p>
              </div>

              <Link href="/register">
                <Button size="lg" className="bg-ivote-primary hover:bg-ivote-primary/90 text-white px-8 py-4 text-lg">
                  GET STARTED
                </Button>
              </Link>

              {/* Social Links */}
              <div className="flex gap-4 pt-4">
                <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-300 cursor-pointer">
                  <span className="text-gray-600">📧</span>
                </div>
                <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-300 cursor-pointer">
                  <span className="text-gray-600">📘</span>
                </div>
                <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-300 cursor-pointer">
                  <span className="text-gray-600">🐦</span>
                </div>
              </div>
            </div>

            {/* Illustration */}
            <div className="relative">
              <img
                src="/diverse-people-voting-at-polling-stations-with-bal.jpg"
                alt="People voting illustration"
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </Card>

        {/* Features Section */}
        <div className="mt-20 space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-gray-800">Our Features</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide an online voting system that exceeds expectations, from secure polling software to the
              management of complex virtual voting events.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 text-center space-y-4 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-ivote-primary/10 rounded-full flex items-center justify-center mx-auto">
                <div className="w-8 h-8 bg-ivote-primary rounded-full"></div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Secured Platform</h3>
              <p className="text-gray-600">With our system, your data is secured</p>
            </Card>

            <Card className="p-8 text-center space-y-4 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-ivote-primary/10 rounded-full flex items-center justify-center mx-auto">
                <div className="w-8 h-8 bg-ivote-primary rounded-full"></div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Vote Online</h3>
              <p className="text-gray-600">In just few clicks, you can vote your preferred candidates</p>
            </Card>

            <Card className="p-8 text-center space-y-4 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-ivote-primary/10 rounded-full flex items-center justify-center mx-auto">
                <div className="w-8 h-8 bg-ivote-primary rounded-full"></div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Real Time Results</h3>
              <p className="text-gray-600">View real time voting results and scores of each candidates</p>
            </Card>
          </div>
        </div>

        {/* Process Steps */}
        <div className="mt-20">
          <Card className="p-12 bg-ivote-gradient text-white">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto">
                  <span className="text-2xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-semibold">SIGN UP</h3>
                <p className="text-white/90">Create an account on this system to vote</p>
              </div>

              <div className="space-y-4">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto">
                  <span className="text-2xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-semibold">VOTE</h3>
                <p className="text-white/90">Vote for your preferred candidate</p>
              </div>

              <div className="space-y-4">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto">
                  <span className="text-2xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-semibold">VIEW ELECTION RESULTS</h3>
                <p className="text-white/90">View election results of various candidates</p>
              </div>
            </div>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center space-y-6">
          <h2 className="text-3xl font-bold text-gray-800">
            Make your decision-making process more modern, safe, and efficient.
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Upgrade from manual ballot counting to an online election system without jeopardizing the integrity of your
            vote.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-ivote-primary text-white mt-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <span className="text-ivote-primary font-bold">i</span>
                </div>
                <span className="text-xl font-bold">VOTE</span>
              </div>
              <p className="text-white/80">© Copyright 2023</p>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Product</h4>
              <div className="space-y-2 text-white/80">
                <div>Website</div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Legal</h4>
              <div className="space-y-2 text-white/80">
                <div>Terms and Conditions</div>
                <div>Privacy Policy</div>
                <div>FAQs</div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Contact Us</h4>
              <div className="space-y-2 text-white/80">
                <div>Address: Dagupan City, Pangasinan</div>
                <div>Email: ivote@email.com</div>
                <div>Phone No.: +63 912 345 6789</div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
