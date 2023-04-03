import { FirebaseTokenResponse } from '@echo/api/dist/types/models/responses/firebase-token-response'
import { ApiRoutes } from '@echo/api/dist/types/routes'
import { useFirebaseAuth } from '@echo/firebase-react'
import { getUrl, logger } from '@echo/utils'
import { R } from '@mobily/ts-belt'
import { signOut as signOutFirebase, Unsubscribe } from 'firebase/auth'
import { signOut, useSession } from 'next-auth/react'
import { isNil } from 'ramda'
import {
  createContext,
  FunctionComponent,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'

export interface CurrentUser {
  loggedInFirebase: boolean
}

const userContext = createContext<CurrentUser | null>(null)

export const FirebaseUserProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const { auth, signIn } = useFirebaseAuth()
  const { data: session } = useSession()

  const login = useCallback(
    () =>
      getUrl<FirebaseTokenResponse>(ApiRoutes.GET_FIREBASE_TOKEN).then((result) => {
        if (R.isOk(result)) {
          void signIn(auth, R.getExn(result).firebaseToken).then(() => {
            setCurrentUser((prevState) => ({ ...prevState, loggedInFirebase: true }))
          })
        }
        logger.error('Error fetching firebase token')
        void signOut()
      }),
    [auth, signIn]
  )

  const onAuthStateChangedUnsubscriber = useRef<Unsubscribe>()

  const [currentUser, setCurrentUser] = useState<CurrentUser>({
    loggedInFirebase: false
  })

  useEffect(() => {
    if (!isNil(session) && !currentUser.loggedInFirebase) {
      logger.debug(`session is not null but firebase is, re-login`)
      void login()
    } else if (isNil(session) && currentUser.loggedInFirebase) {
      logger.debug(`session is null but firebase is not, signing out`)
      void signOutFirebase(auth)
    }
  }, [auth, currentUser.loggedInFirebase, login, session])
  // listen for app auth changes
  useEffect((): VoidFunction => {
    if (isNil(onAuthStateChangedUnsubscriber.current)) {
      onAuthStateChangedUnsubscriber.current = auth.onAuthStateChanged(
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
    return () => onAuthStateChangedUnsubscriber.current?.()
  }, [auth, currentUser.loggedInFirebase, login, session])

  return <userContext.Provider value={currentUser}>{children}</userContext.Provider>
}

export const useFirebaseUser = (): CurrentUser => {
  const contextValue = useContext(userContext)
  if (!contextValue) {
    throw new Error('useFirebaseUser must be used within FirebaseUserProvider.')
  }
  return contextValue
}
