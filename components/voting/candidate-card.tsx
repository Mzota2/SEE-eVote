"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Candidate } from "@/lib/types"
import { User } from "lucide-react"

interface CandidateCardProps {
  candidate: Candidate
  isSelected: boolean
  onSelect: () => void
  onViewDetails: () => void
}

export function CandidateCard({ candidate, isSelected, onSelect, onViewDetails }: CandidateCardProps) {
  return (
    <Card
      className={`p-6 text-center transition-all ${isSelected ? "ring-2 ring-ivote-primary bg-ivote-primary/5" : "hover:shadow-lg"}`}
    >
      <div className="space-y-4">
        {/* Candidate Image */}
        <div className="w-24 h-24 mx-auto rounded-full overflow-hidden bg-gray-200">
          {candidate.image ? (
            <img
              src={candidate.image || "/placeholder.svg"}
              alt={candidate.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <User className="w-12 h-12 text-gray-400" />
            </div>
          )}
        </div>

        {/* Candidate Info */}
        <div className="space-y-2">
          <h3 className="font-bold text-gray-800">{candidate.name}</h3>
          <p className="text-sm text-gray-600">{candidate.department}</p>
          {candidate.age && <p className="text-sm text-gray-500">{candidate.age} years old</p>}
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <Button
            onClick={onSelect}
            className={`w-full ${
              isSelected ? "bg-ivote-primary text-white" : "bg-ivote-primary hover:bg-ivote-primary/90 text-white"
            }`}
          >
            {isSelected ? "SELECTED" : "VOTE"}
          </Button>
          <Button
            onClick={onViewDetails}
            variant="outline"
            className="w-full border-ivote-primary text-ivote-primary hover:bg-ivote-primary hover:text-white bg-transparent"
          >
            View Details
          </Button>
        </div>
      </div>
    </Card>
  )
}
