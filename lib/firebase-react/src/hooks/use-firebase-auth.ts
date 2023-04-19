import { FirebaseAuth } from '../types/firebase-auth'
import { useFirebase } from './use-firebase'
import { getAuth, signInWithCustomToken } from 'firebase/auth'

export function useFirebaseAuth(): FirebaseAuth {
  const firebaseApp = useFirebase()
  return { auth: getAuth(firebaseApp), signIn: signInWithCustomToken }
}
