import { useFirebase } from './use-firebase'
import { getAuth } from 'firebase/auth'

export function useFirebaseAuth() {
  const firebaseApp = useFirebase()
  return getAuth(firebaseApp)
}
