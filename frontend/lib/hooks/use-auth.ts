import { useFirebase } from '@components/providers/firebase-provider'
import { SwrKey } from '@lib/services/swr/constants/swr-key'
import { getAuth, signInWithCustomToken, UserCredential } from 'firebase/auth'
import { isNil } from 'ramda'
import useSWR from 'swr'

export const useAuth = (apiKey: string | undefined) => {
  const { isInitialized } = useFirebase()
  const auth = getAuth()
  const { data, error } = useSWR<UserCredential>(isInitialized && apiKey && SwrKey.FIREBASE_LOGIN, () =>
    signInWithCustomToken(auth, apiKey!)
  )

  return { data, loggedIn: !isNil(data), error }
}
