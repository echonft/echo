import { useGetFirebaseAuth } from '@lib/services/firebase/hooks/use-get-firebase-auth'
import { SwrKey } from '@lib/services/swr/constants/swr-key'
import { signInWithCustomToken, UserCredential } from 'firebase/auth'
import { isNil } from 'rambda'
import useSWR from 'swr'

// TODO Use Result
export const useSignInWithFirebase = (apiKey: string | undefined) => {
  const { auth, error: firebaseAuthError } = useGetFirebaseAuth()
  const { data, error } = useSWR<UserCredential, Error>(
    !isNil(auth) && isNil(firebaseAuthError) && !isNil(apiKey) && SwrKey.FIREBASE_LOGIN,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    () => signInWithCustomToken(auth, apiKey!)
  )

  return { data, loggedIn: !isNil(data) && isNil(error), error }
}
