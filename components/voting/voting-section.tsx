"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CandidateCard } from "./candidate-card"
import { CandidateModal } from "./candidate-modal"
import { castVote } from "@/lib/database"
import { useToast } from "@/hooks/use-toast"
import type { Election, User, Candidate } from "@/lib/types"

interface VotingSectionProps {
  election: Election
  user: User
}

// Mock candidates data - in real app this would come from the database
const mockCandidates: Record<string, Candidate[]> = {
  "President Student Council": [
    {
      id: "1",
      name: "Felisa Monteverde",
      position: "President Student Council",
      department: "System Development",
      age: 22,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      platform: [
        "Increase student involvement in the Student Council: I will strive to make the student council more accessible and open to all students by holding open forums and making the student council more visible.",
        "Improve Communication: I will work to improve the availability of information about Student Council activities and events, as well as ensure that students are kept informed of upcoming initiatives and activities.",
        "Foster Collaboration: I will work to bring together student organizations and clubs to foster collaboration, as well as create opportunities for students to take part in meaningful activities outside of the classroom.",
        "Strengthen Relationships: I will work to strengthen relationships between the student body and faculty, as well as the student body and the wider community.",
      ],
      electionId: "1",
      positionId: "1",
      createdAt: new Date(),
    },
    {
      id: "2",
      name: "Emma Ainsley Zamora",
      position: "President Student Council",
      department: "Web Development",
      age: 21,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      platform: [
        "Digital Innovation: Modernize student services through technology integration",
        "Inclusive Leadership: Ensure all student voices are heard and represented",
        "Academic Excellence: Support programs that enhance learning outcomes",
        "Campus Life Enhancement: Improve facilities and student activities",
      ],
      electionId: "1",
      positionId: "1",
      createdAt: new Date(),
    },
    {
      id: "3",
      name: "Lorenzo Agustin",
      position: "President Student Council",
      department: "Animation",
      age: 23,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      platform: [
        "Creative Expression: Promote arts and creative programs on campus",
        "Student Wellness: Focus on mental health and well-being initiatives",
        "Community Building: Strengthen bonds between different student groups",
        "Sustainable Campus: Implement eco-friendly practices and policies",
      ],
      electionId: "1",
      positionId: "1",
      createdAt: new Date(),
    },
  ],
  "Vice President Student Council": [
    {
      id: "4",
      name: "Kasey Rachel Flores",
      position: "Vice President Student Council",
      department: "System Development",
      age: 20,
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
      platform: [
        "Support Leadership: Work closely with the president to implement initiatives",
        "Student Advocacy: Be the voice for student concerns and suggestions",
        "Event Coordination: Organize engaging campus events and activities",
        "Academic Support: Develop tutoring and study programs",
      ],
      electionId: "1",
      positionId: "2",
      createdAt: new Date(),
    },
    {
      id: "5",
      name: "Carolina Labasan",
      position: "Vice President Student Council",
      department: "Web Development",
      age: 22,
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face",
      platform: [
        "Technology Integration: Enhance digital platforms for student services",
        "Collaborative Leadership: Foster teamwork and cooperation",
        "Student Resources: Improve access to academic and career resources",
        "Campus Safety: Advocate for better security and safety measures",
      ],
      electionId: "1",
      positionId: "2",
      createdAt: new Date(),
    },
    {
      id: "6",
      name: "Meagan Catubig",
      position: "Vice President Student Council",
      department: "Animation",
      age: 21,
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop&crop=face",
      platform: [
        "Creative Programs: Expand opportunities for artistic expression",
        "Student Engagement: Increase participation in council activities",
        "Diversity & Inclusion: Promote a welcoming campus environment",
        "Leadership Development: Mentor future student leaders",
      ],
      electionId: "1",
      positionId: "2",
      createdAt: new Date(),
    },
  ],
  "Secretary Student Council": [
    {
      id: "7",
      name: "Elle Cojuangco",
      position: "Secretary Student Council",
      department: "System Development",
      age: 19,
      image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=400&fit=crop&crop=face",
      platform: [
        "Transparent Communication: Maintain clear records and communications",
        "Efficient Documentation: Streamline meeting minutes and records",
        "Student Information: Keep students informed about council decisions",
        "Administrative Excellence: Ensure smooth council operations",
      ],
      electionId: "1",
      positionId: "3",
      createdAt: new Date(),
    },
    {
      id: "8",
      name: "Claudio Lucio Tejada",
      position: "Secretary Student Council",
      department: "Web Development",
      age: 20,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      platform: [
        "Digital Records: Modernize documentation and record-keeping",
        "Accessibility: Make council information easily accessible to all",
        "Process Improvement: Streamline administrative procedures",
        "Student Feedback: Create systems for collecting student input",
      ],
      electionId: "1",
      positionId: "3",
      createdAt: new Date(),
    },
  ],
}

export function VotingSection({ election, user }: VotingSectionProps) {
  const [selectedCandidates, setSelectedCandidates] = useState<Record<string, string>>({})
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const { toast } = useToast()

  const positions = Object.keys(mockCandidates)

  const handleCandidateSelect = (positionId: string, candidateId: string) => {
    setSelectedCandidates((prev) => ({
      ...prev,
      [positionId]: candidateId,
    }))
  }

  const handleViewDetails = (candidate: Candidate) => {
    setSelectedCandidate(candidate)
    setIsModalOpen(true)
  }

  const handleSubmitVotes = async () => {
    const selectedCount = Object.keys(selectedCandidates).length

    if (selectedCount === 0) {
      toast({
        title: "No Votes Selected",
        description: "Please select at least one candidate before submitting.",
        variant: "destructive",
      })
      return
    }

    setSubmitting(true)

    try {
      // Submit votes for each selected candidate
      for (const [positionId, candidateId] of Object.entries(selectedCandidates)) {
        const { success, error } = await castVote({
          voterId: user.id,
          electionId: election.id,
          positionId,
          candidateId,
          organizationId: user.organizationId || "default",
        })

        if (!success && error) {
          throw new Error(error)
        }
      }

      toast({
        title: "Votes Submitted Successfully",
        description: `You have successfully voted for ${selectedCount} position(s).`,
      })

      // Reset selections
      setSelectedCandidates({})
    } catch (error: any) {
      toast({
        title: "Vote Submission Failed",
        description: error.message || "An error occurred while submitting your votes.",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="space-y-8">
      {positions.map((position, index) => (
        <Card key={position} className="p-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2">{position}</h2>
            <p className="text-gray-600">You can only vote for one candidate</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {mockCandidates[position].map((candidate) => (
              <CandidateCard
                key={candidate.id}
                candidate={candidate}
                isSelected={selectedCandidates[position] === candidate.id}
                onSelect={() => handleCandidateSelect(position, candidate.id)}
                onViewDetails={() => handleViewDetails(candidate)}
              />
            ))}
          </div>
        </Card>
      ))}

      <div className="text-center py-6">
        <p className="text-gray-600 mb-4">Double-check your choices before submitting your votes.</p>
        <Button
          onClick={handleSubmitVotes}
          disabled={submitting || Object.keys(selectedCandidates).length === 0}
          size="lg"
          className="bg-ivote-primary hover:bg-ivote-primary/90 text-white px-12 py-3"
        >
          {submitting ? "SUBMITTING VOTE..." : "SUBMIT VOTE"}
        </Button>
      </div>

      <CandidateModal candidate={selectedCandidate} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
