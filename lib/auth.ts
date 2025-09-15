import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User as FirebaseUser,
} from "firebase/auth"
import { doc, setDoc, getDoc, updateDoc, deleteDoc } from "firebase/firestore"
import { auth, db } from "./firebase"
import type { User } from "./types"
import type { Role } from "./types"
import {httpsCallable} from 'firebase/functions'
export const signUp = async (email: string, password: string, userData: Partial<User>) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    const newUser: User = {
      id: user.uid,
      email: user.email!,
      name: userData.name || "",
      organizationIds: userData.organizationIds || [""],
      createdAt: new Date(),
      updatedAt: new Date(),
      ...userData,
    }

    await setDoc(doc(db, "users", user.uid), newUser)
    return { user: newUser, error: null }
  } catch (error: any) {
    return { user: null, error: error.message }
  }
}

export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const userDoc = await getDoc(doc(db, "users", userCredential.user.uid))

    if (userDoc.exists()) {
      return { user: userDoc.data() as User, error: null }
    } else {
      throw new Error("User data not found")
    }
  } catch (error: any) {
    return { user: null, error: error.message }
  }
}

export const signOut = async () => {
  try {
    await firebaseSignOut(auth)
    return { error: null }
  } catch (error: any) {
    return { error: error.message }
  }
}

export const updateAccount = async(userId:string, updateData:Partial <User> )=>{
  try {
   const newUser = {
      updatedAt:new Date(),
      ...updateData,
    }
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, updateData);
    return { user: newUser, error: null }
  } catch (error : any) {
     return { user: null, error: error.message }
  
  }
  
}

export const deleteAccount = async(userId:string)=>{
  try {
    const userRef = doc(db, 'users', userId);
    await deleteDoc(userRef);
    
  } catch (error:any) {
    return {user:null, error:error.message}
  }
}

export const getCurrentUser = async (): Promise<User | null> => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      unsubscribe()
      if (firebaseUser) {
        const userDoc = await getDoc(doc(db, "users", firebaseUser.uid))
        if (userDoc.exists()) {
          resolve(userDoc.data() as User)
        } else {
          resolve(null)
        }
      } else {
        resolve(null)
      }
    })
  })
}
