"use client"

import { Search, Bell, HelpCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/use-auth"

export function Header() {
  const { user } = useAuth()

  return (
    <header className="bg-white border-b px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input placeholder="Search" className="pl-10 bg-gray-50 border-0" />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm">
            <Bell className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="sm">
            <HelpCircle className="w-5 h-5" />
          </Button>
          {user && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
              <span className="font-medium text-gray-800">{user.name.split(" ")[0]}</span>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
