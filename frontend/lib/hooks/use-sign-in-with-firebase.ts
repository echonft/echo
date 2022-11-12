import { UserCredential } from '@firebase/auth'
import { SwrKey } from '@lib/constants/swr-key'
import { useGetFirebaseAuth } from '@lib/hooks/use-get-firebase-auth'
import { signInWithCustomToken } from 'firebase/auth'
import { isNil } from 'ramda'
import useSWR from 'swr'

// TODO Use Result
export const useSignInWithFirebase = (apiKey: string | undefined) => {
  const { auth, error: firebaseAuthError } = useGetFirebaseAuth()
  const { data, error } = useSWR<UserCredential>(auth && !firebaseAuthError && apiKey && SwrKey.FIREBASE_LOGIN, () =>
    signInWithCustomToken(auth!, apiKey!)
  )

  return { data, loggedIn: !isNil(data) && isNil(error), error }
}
