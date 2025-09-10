export interface User {
  id: string
  email: string
  name: string
  role: "superAdmin" | "admin" | "voter"
  organizationId?: string
  createdAt: Date
  profileImage?: string
  contactNumber?: string
  address?: {
    region: string
    street: string
    city: string
  }
}

export interface Election {
  id: string
  title: string
  description?: string
  startTime: Date
  endTime: Date
  createdBy: string
  organizationId: string
  status: "pending" | "ongoing" | "closed"
  electionToken: string
  positions: Position[]
  createdAt: Date
}

export interface Position {
  id: string
  title: string
  description?: string
  maxVotes: number
  candidates: Candidate[]
}

export interface Candidate {
  id: string
  name: string
  position: string
  department?: string
  age?: number
  image?: string
  platform?: string[]
  electionId: string
  positionId: string
  createdAt: Date
}

export interface Vote {
  id: string
  voterId: string
  electionId: string
  positionId: string
  candidateId: string
  timestamp: Date
  organizationId: string
}

export interface Organization {
  id: string
  name: string
  adminId: string
  electionToken: string
  isActive: boolean
  createdAt: Date
}

export interface AuditLog {
  id: string
  userId: string
  action: string
  electionId?: string
  organizationId: string
  timestamp: Date
  details?: Record<string, any>
}

export interface VotingStats {
  totalRegisteredVoters: number
  totalVotes: number
  totalCandidates: number
  electionId: string
}
