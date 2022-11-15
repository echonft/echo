import { useFirebase } from '@echo/frontend/components/providers/firebase-provider'
import { SwrKey } from '@echo/frontend/lib/services/swr/constants/swr-key'
import { getAuth } from 'firebase/auth'
import useSWR from 'swr'

// TODO Use Result
export function useGetFirebaseAuth() {
  const { isInitialized, firebaseApp } = useFirebase()
  const { data, error } = useSWR(isInitialized ? SwrKey.FIREBASE_GET_AUTH : undefined, () => getAuth(firebaseApp))
  return { auth: data, error }
}
