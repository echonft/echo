import { useFirebaseAuth } from '@echo/firebase-react'
import { logger } from '@echo/utils'
import { createContext, FunctionComponent, PropsWithChildren, useContext, useEffect, useState } from 'react'

export interface CurrentUser {
  loggedInFirebase: boolean
}

const userContext = createContext<CurrentUser | null>(null)

export const FirebaseUserProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const { auth } = useFirebaseAuth()

  const [currentUser, setCurrentUser] = useState<CurrentUser>({
    loggedInFirebase: false
  })
  // listen for app auth changes
  useEffect((): void => {
    const unsubscribe = auth.onAuthStateChanged(
      (user) => {
        if (user) {
          logger.debug(`auth state changed - user id ${user.uid}`)
        } else {
          logger.debug('auth state changed - user disconnected')
        }
      },
      (error) => {
        logger.error('onAuthStateChanged error', error)
      }
    )
    return unsubscribe()
  }, [auth, setCurrentUser])

  return <userContext.Provider value={currentUser}>{children}</userContext.Provider>
}

export const useFirebaseUser = (): CurrentUser => {
  const contextValue = useContext(userContext)
  if (!contextValue) {
    throw new Error('useFirebaseUser must be used within FirebaseUserProvider.')
  }
  return contextValue
}
