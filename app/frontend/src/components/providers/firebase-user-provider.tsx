import { ApiRoutes, FirebaseTokenResponse, getApiRouteUrl } from '@echo/api-public'
import { useFirebaseAuth } from '@echo/firebase-react'
import { getUrl, logger } from '@echo/utils'
import { R } from '@mobily/ts-belt'
import { Unsubscribe } from 'firebase/auth'
import { signOut, useSession } from 'next-auth/react'
import { isNil } from 'ramda'
import { createContext, FunctionComponent, PropsWithChildren, useContext, useEffect, useRef, useState } from 'react'
import useSWR from 'swr'

export interface CurrentUser {
  loggedInFirebase: boolean
}

const userContext = createContext<CurrentUser | null>(null)

export const FirebaseUserProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const { auth, signIn } = useFirebaseAuth()
  const { data: session } = useSession()
  const onAuthStateChangedUnsubscribe = useRef<Unsubscribe>()
  const [currentUser, setCurrentUser] = useState<CurrentUser>({
    loggedInFirebase: false
  })
  // State to fetch token when needed
  const [shouldLogin, setShouldLogin] = useState<boolean>(false)
  // Fetch token when logging in
  // TODO Move into a hook
  useSWR<void, Error>(shouldLogin ? getApiRouteUrl(ApiRoutes.GET_FIREBASE_TOKEN) : undefined, (url: string) =>
    getUrl<FirebaseTokenResponse>(url).then((result) => {
      if (R.isOk(result)) {
        void signIn(auth, R.getExn(result).firebaseToken).then(() => {
          setCurrentUser((prevState) => ({ ...prevState, loggedInFirebase: true }))
          setShouldLogin(false)
        })
      } else {
        logger.error('Error fetching firebase token')
        void signOut().then(() => setShouldLogin(false))
      }
    })
  )

  // Listen for session change
  useEffect(() => {
    if (!isNil(session) && !currentUser.loggedInFirebase && !shouldLogin) {
      logger.debug('Session is auth, will login to firebase')
      setShouldLogin(true)
    }
  }, [currentUser.loggedInFirebase, shouldLogin, session, auth])

  // Listen for app auth changes
  useEffect((): VoidFunction => {
    // We use a ref to avoid having multiple listeners since session remounts several times
    if (isNil(onAuthStateChangedUnsubscribe.current)) {
      onAuthStateChangedUnsubscribe.current = auth.onAuthStateChanged(
        (user) => {
          if (user) {
            if (!currentUser.loggedInFirebase) {
              logger.debug(`auth state changed - user id ${user.uid}`)
              setCurrentUser({ loggedInFirebase: true })
            }
          } else {
            if (currentUser.loggedInFirebase) {
              logger.debug('auth state changed - user disconnected')
              setCurrentUser({ loggedInFirebase: false })
            }
          }
        },
        (error) => {
          logger.error('onAuthStateChanged error', error)
        }
      )
    }
    return () => onAuthStateChangedUnsubscribe.current?.()
  }, [auth, currentUser.loggedInFirebase, session])

  return <userContext.Provider value={currentUser}>{children}</userContext.Provider>
}

export const useFirebaseUser = (): CurrentUser => {
  const contextValue = useContext(userContext)
  if (!contextValue) {
    throw new Error('useFirebaseUser must be used within FirebaseUserProvider.')
  }
  return contextValue
}
