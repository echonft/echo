import { useFirebase } from './use-firebase'
import { getConditionalFetchKey, SwrKey, SwrKeyNames } from '@echo/swr'
import { isNilOrEmpty } from '@echo/utils'
import { R } from '@mobily/ts-belt'
import { Auth, getAuth, signInWithCustomToken, UserCredential } from 'firebase/auth'
import { always, converge, isNil, pipe, prop } from 'ramda'
import useSWR from 'swr'

interface KeyData {
  firebaseAuth: Auth
  apiKey: string | undefined
}
export const useSignInWithFirebase = (apiKey: string | undefined) => {
  const firebaseApp = useFirebase()
  const firebaseAuth = getAuth(firebaseApp)
  return useSWR<R.Result<UserCredential, Error>, Error, SwrKey<KeyData> | undefined>(
    getConditionalFetchKey<KeyData>(
      { name: SwrKeyNames.FIREBASE_LOGIN, data: { firebaseAuth, apiKey } },
      always(isNil(firebaseAuth) || isNilOrEmpty(apiKey))
    ),
    pipe(prop('data'), converge(signInWithCustomToken, [prop('firebaseAuth'), prop('apiKey')]), R.fromPromise)
  )
}
