"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/use-auth"
import { signOut } from "@/lib/auth"
import { cn } from "@/lib/utils"
import { Home, Vote, BookOpen, Settings, LogOut, User, Users, Calendar, BarChart3, Shield } from "lucide-react"

const getNavigation = (userRole: string) => {
  const baseNavigation = [{ name: "Dashboard", href: "/dashboard", icon: Home }]

  if (userRole === "admin" || userRole === "superAdmin") {
    return [
      ...baseNavigation,
      { name: "Elections", href: "/dashboard/elections", icon: Calendar },
      { name: "Candidates", href: "/dashboard/candidates", icon: Users },
      { name: "Voters", href: "/dashboard/voters", icon: User },
      { name: "Results", href: "/dashboard/results", icon: BarChart3 },
      { name: "Settings", href: "/dashboard/settings", icon: Settings },
    ]
  }

  return [
    ...baseNavigation,
    { name: "Vote", href: "/dashboard/vote", icon: Vote },
    { name: "Voters Guideline", href: "/dashboard/guidelines", icon: BookOpen },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ]
}

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { user } = useAuth()

  const navigation = user ? getNavigation(user.role) : []

  const handleLogout = async () => {
    await signOut()
    router.push("/")
  }

  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-50">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center gap-2 p-6 border-b">
          <div className="w-8 h-8 bg-ivote-primary rounded-full flex items-center justify-center">
            <span className="text-white font-bold">i</span>
          </div>
          <span className="text-xl font-bold text-gray-800">VOTE</span>
        </div>

        {/* User Profile */}
        {user && (
          <div className="p-6 border-b">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                {user.role === "admin" || user.role === "superAdmin" ? (
                  <Shield className="w-6 h-6 text-gray-600" />
                ) : (
                  <User className="w-6 h-6 text-gray-600" />
                )}
              </div>
              <div>
                <p className="font-medium text-gray-800">{user.name}</p>
                <p className="text-sm text-gray-600 capitalize">{user.role}</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.name} href={item.href}>
                <div
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                    isActive ? "bg-ivote-primary text-white" : "text-gray-600 hover:bg-gray-100 hover:text-gray-800",
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </div>
              </Link>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t">
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="w-full justify-start gap-3 text-gray-600 hover:text-gray-800"
          >
            <LogOut className="w-5 h-5" />
            Log out
          </Button>
        </div>
      </div>
    </div>
  )
}
