import { useFirebase } from '@components/providers/firebase-provider'
import { SwrKey } from '@lib/services/swr/constants/swr-key'
import { Auth, getAuth } from 'firebase/auth'
import useSWR from 'swr'

// TODO Use Result
export function useGetFirebaseAuth() {
  const { isInitialized, firebaseApp } = useFirebase()
  const { data, error } = useSWR<Auth, Error>(isInitialized ? SwrKey.FIREBASE_GET_AUTH : undefined, () =>
    getAuth(firebaseApp)
  )
  return { auth: data, error }
}
