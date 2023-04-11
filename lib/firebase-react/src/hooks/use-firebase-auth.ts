import { useFirebase } from './use-firebase'
import { getAuth, signInWithCustomToken } from 'firebase/auth'

export function useFirebaseAuth() {
  const firebaseApp = useFirebase()
  return { auth: getAuth(firebaseApp), signIn: signInWithCustomToken }
}
