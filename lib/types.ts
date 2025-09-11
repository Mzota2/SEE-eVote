export interface User {
  id: string
  email: string
  name: string
  role: Role[]
  profileImage?: string
  contactNumber?: string
  organizationIds?:string[]
  address?: {
    region: string
    street: string
    city: string
  }
  createdAt: Date
  updatedAt: Date
}

export interface Role{
  id:string,
  name:"default" | "voter" | "admin" | "superadmin"
  userId:string,
  electionId:string,
  organizationId:string,
  createdAt:Date
  updatedAt:Date
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
  maxVoters?:number
  positions: Position[]
  createdAt: Date
  updatedAt: Date
}

export interface Position {
  id: string
  createdBy: string
  title: string
  electionId:string
  organizationId:string
  description?: string
  maxVotes?: number
  candidates: Candidate[]
  createdAt: Date
  updatedAt: Date
}

export interface Candidate {
  id: string
  name: string
  position: string
  image?: string
  platform?: string[]
  electionId: string
  positionId: string
  createdAt:Date
  updatedAt: Date
}

export interface Vote {
  id: string
  voterId: string
  electionId: string
  positionId: string
  candidateId: string
  organizationId: string
  createdAt: Date
  updatedAt: Date
  
}

export interface Organization {
  id: string
  name: string
  description?:string
  createdBy: string
  logo?:string
  electionToken: string
  isActive: boolean
  createdAt:Date
  updatedAt:Date
}

export interface AuditLog {
  id: string
  userId: string
  action: string
  electionId: string
  organizationId: string
  timestamp: Date
  details?: Record<string, any>
}

export interface VotingStats {
  id:string,
  totalRegisteredVoters: number
  totalVotes: number
  totalCandidates: number
  electionId: string
  organizationId:string
  totalReportedIssues?:number
  createdAt:Date
}
