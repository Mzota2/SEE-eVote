"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { VotersList } from "@/components/admin/voters-list"
import { getUsersByOrganization } from "@/lib/database"
import type { User } from "@/lib/types"

export default function VotersPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [voters, setVoters] = useState<User[]>([])
  const [loadingVoters, setLoadingVoters] = useState(true)

  useEffect(() => {
    if (!loading && (!user || (user.role !== "admin" && user.role !== "superAdmin"))) {
      router.push("/dashboard")
    }
  }, [user, loading, router])

  useEffect(() => {
    const fetchVoters = async () => {
      if (user && (user.role === "admin" || user.role === "superAdmin")) {
        const { users: fetchedUsers } = await getUsersByOrganization(user.organizationId || "default")
        setVoters(fetchedUsers.filter((u) => u.role === "voter"))
        setLoadingVoters(false)
      }
    }

    fetchVoters()
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
          <h1 className="text-2xl font-bold text-gray-800">Voters Management</h1>
          <p className="text-gray-600">Manage registered voters and their permissions</p>
        </div>

        <VotersList voters={voters} loading={loadingVoters} onVotersUpdate={setVoters} />
      </div>
    </DashboardLayout>
  )
}
