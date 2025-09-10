"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { OngoingElections } from "@/components/dashboard/ongoing-elections"
import { LiveResults } from "@/components/dashboard/live-results"
import { VotingProcess } from "@/components/dashboard/voting-process"
import { ElectionActivities } from "@/components/dashboard/election-activities"
import { Calendar } from "@/components/dashboard/calendar"
import { getElections } from "@/lib/database"
import type { Election } from "@/lib/types"

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [elections, setElections] = useState<Election[]>([])
  const [loadingElections, setLoadingElections] = useState(true)

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  useEffect(() => {
    const fetchElections = async () => {
      const { elections: fetchedElections } = await getElections()
      setElections(fetchedElections)
      setLoadingElections(false)
    }

    if (user) {
      fetchElections()
    }
  }, [user])

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-ivote-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Hello, {user.name.split(" ")[0]}!</h1>
          <p className="text-gray-600">Welcome LOGO's Online Voting System</p>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <OngoingElections elections={elections} loading={loadingElections} />
            <LiveResults />
            <ElectionActivities />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <Calendar />
            <VotingProcess />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
