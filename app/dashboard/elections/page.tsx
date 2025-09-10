"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { ElectionsList } from "@/components/admin/elections-list"
import { CreateElectionModal } from "@/components/admin/create-election-modal"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { getElections } from "@/lib/database"
import type { Election } from "@/lib/types"

export default function ElectionsPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [elections, setElections] = useState<Election[]>([])
  const [loadingElections, setLoadingElections] = useState(true)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

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

  const handleElectionCreated = (newElection: Election) => {
    setElections((prev) => [newElection, ...prev])
    setIsCreateModalOpen(false)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Elections Management</h1>
            <p className="text-gray-600">Create and manage elections for your organization</p>
          </div>
          <Button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-ivote-primary hover:bg-ivote-primary/90 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Election
          </Button>
        </div>

        <ElectionsList elections={elections} loading={loadingElections} onElectionUpdate={setElections} />

        <CreateElectionModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onElectionCreated={handleElectionCreated}
          user={user}
        />
      </div>
    </DashboardLayout>
  )
}
