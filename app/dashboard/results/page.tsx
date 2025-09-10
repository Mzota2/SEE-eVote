"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { ResultsOverview } from "@/components/admin/results-overview"
import { getElections } from "@/lib/database"
import type { Election } from "@/lib/types"

export default function ResultsPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [elections, setElections] = useState<Election[]>([])
  const [loadingElections, setLoadingElections] = useState(true)

  useEffect(() => {
    if (!loading && (!user || (user.role !== "admin" && user.role !== "superAdmin"))) {
      router.push("/dashboard")
    }
  }, [user, loading, router])

  useEffect(() => {
    const fetchElections = async () => {
      if (user && (user.role === "admin" || user.role === "superAdmin")) {
        const { elections: fetchedElections } = await getElections(user.organizationId)
        setElections(fetchedElections)
        setLoadingElections(false)
      }
    }

    fetchElections()
  }, [user])

  if (loading || !user || (user.role !== "admin" && user.role !== "superAdmin")) {
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
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Election Results</h1>
          <p className="text-gray-600">View and analyze election results and statistics</p>
        </div>

        <ResultsOverview elections={elections} loading={loadingElections} />
      </div>
    </DashboardLayout>
  )
}
