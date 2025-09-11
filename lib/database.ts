import { collection, addDoc, getDocs, query, where, orderBy, serverTimestamp } from "firebase/firestore"
import { db } from "./firebase"
import type { Election, Vote, Organization, User } from "./types"

// Election Management
export const createElection = async (electionData: Omit<Election, "id" | "createdAt" | "updatedAt">) => {
  try {
    const docRef = await addDoc(collection(db, "elections"), {
      ...electionData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    })
    return { id: docRef.id, error: null }
  } catch (error: any) {
    return { id: null, error: error.message }
  }
}

export const getElections = async (organizationId?: string) => {
  try {
    let q = query(collection(db, "elections"), orderBy("createdAt", "desc"))

    if (organizationId) {
      q = query(
        collection(db, "elections"),
        where("organizationId", "==", organizationId),
        orderBy("createdAt", "desc"),
      )
    }

    const querySnapshot = await getDocs(q)
    const elections = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Election[]

    return { elections, error: null }
  } catch (error: any) {
    return { elections: [], error: error.message }
  }
}

// Voting Functions
export const castVote = async (voteData: Omit<Vote, "id" | "createdAt" | "updatedAt">) => {
  try {
    // Check if user has already voted for this position
    const existingVoteQuery = query(
      collection(db, "votes"),
      where("voterId", "==", voteData.voterId),
      where("electionId", "==", voteData.electionId),
      where("positionId", "==", voteData.positionId),
      where("candidateId", "==", voteData.candidateId),
      where("organizationId", "==", voteData.organizationId),
    )

    const existingVotes = await getDocs(existingVoteQuery)

    if (!existingVotes.empty) {
      return { success: false, error: "You have already voted for this position" }
    }

    const docRef = await addDoc(collection(db, "votes"), {
      ...voteData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    })

    // Log the vote action
    await logAction(voteData.voterId, "VOTE_CAST", voteData.electionId, voteData.organizationId)

    return { success: true, voteId: docRef.id, error: null }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export const getVoteResults = async (electionId: string) => {
  try {
    const votesQuery = query(collection(db, "votes"), where("electionId", "==", electionId))

    const votesSnapshot = await getDocs(votesQuery)
    const votes = votesSnapshot.docs.map((doc) => doc.data() as Vote)

    // Group votes by position and candidate
    const results = votes.reduce(
      (acc, vote) => {
        if (!acc[vote.positionId]) {
          acc[vote.positionId] = {}
        }
        if (!acc[vote.positionId][vote.candidateId]) {
          acc[vote.positionId][vote.candidateId] = 0
        }
        acc[vote.positionId][vote.candidateId]++
        return acc
      },
      {} as Record<string, Record<string, number>>,
    )

    return { results, totalVotes: votes.length, error: null }
  } catch (error: any) {
    return { results: {}, totalVotes: 0, error: error.message }
  }
}

// Organization Management
export const createOrganization = async (orgData: Omit<Organization, "id" | "createdAt" | "updatedAt">) => {
  try {
    const docRef = await addDoc(collection(db, "organizations"), {
      ...orgData,
      createdAt: serverTimestamp(),
      updatedAt:serverTimestamp()
    })
    return { id: docRef.id, error: null }
  } catch (error: any) {
    return { id: null, error: error.message }
  }
}

// Audit Logging
export const logAction = async (
  userId: string,
  action: string,
  electionId?: string,
  organizationId?: string,
  details?: Record<string, any>,
) => {
  try {
    await addDoc(collection(db, "auditLogs"), {
      userId,
      action,
      electionId,
      organizationId,
      details,
      timestamp: serverTimestamp(),
    })
  } catch (error) {
    console.error("Failed to log action:", error)
  }
}

// User Management
export const getUsersByOrganization = async (organizationId: string) => {
  try {
    const usersQuery = query(collection(db, "users"), where("organizationIds", "array-contains", organizationId))

    const usersSnapshot = await getDocs(usersQuery)
    const users = usersSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as User[]

    return { users, error: null }
  } catch (error: any) {
    return { users: [], error: error.message }
  }
}
