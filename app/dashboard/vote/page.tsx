"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { VotingSection } from "@/components/voting/voting-section"
import { getElections } from "@/lib/database"
import type { Election } from "@/lib/types"
import { Card } from "@/components/ui/card"

export default function VotePage() {
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
      const ongoingElections = fetchedElections.filter((election) => election.status === "ongoing")
      setElections(ongoingElections)
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

  if (loadingElections) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <div className="w-8 h-8 border-2 border-ivote-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading elections...</p>
        </div>
      </DashboardLayout>
    )
  }

  if (elections.length === 0) {
    return (
      <DashboardLayout>
        <Card className="p-12 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">No Active Elections</h1>
          <p className="text-gray-600">There are currently no ongoing elections available for voting.</p>
        </Card>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-ivote-primary mb-2">YOU MAY NOW CAST YOUR VOTES!</h1>
        </div>

        {elections.map((election) => (
          <VotingSection key={election.id} election={election} user={user} />
        ))}
      </div>
    </DashboardLayout>
  )
}
