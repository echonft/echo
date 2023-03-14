import { errorMessage, logger } from '@echo/utils'
import { FirebaseApp, FirebaseOptions, initializeApp } from 'firebase/app'
import { browserLocalPersistence, getAuth } from 'firebase/auth'
import { isNil } from 'ramda'
import { createContext, FunctionComponent, PropsWithChildren, useContext, useEffect, useState } from 'react'

interface FirebaseProviderValue {
  isInitialized: boolean
  firebaseApp: FirebaseApp | undefined
}

const firebaseContext = createContext<FirebaseProviderValue | null>(null)

interface Props {
  options: FirebaseOptions
}

export const FirebaseProvider: FunctionComponent<PropsWithChildren<Props>> = ({ options, children }) => {
  const [firebaseApp, setFirebaseApp] = useState<FirebaseApp>()
  useEffect((): void => {
    if (!isNil(options) && isNil(firebaseApp)) {
      const localFirebaseApp = initializeApp(options)
      getAuth(localFirebaseApp)
        .setPersistence(browserLocalPersistence)
        .then(() => {
          setFirebaseApp(localFirebaseApp)
        })
        .catch((error) => {
          logger.error(`Can't set persistence on Firebase Auth: ${errorMessage(error)}`)
        })
    }
  }, [options, firebaseApp, logger])

  return (
    <firebaseContext.Provider
      value={{
        isInitialized: !isNil(firebaseApp),
        firebaseApp
      }}
    >
      {children}
    </firebaseContext.Provider>
  )
}

export const useFirebase = (): FirebaseProviderValue => {
  const contextValue = useContext(firebaseContext)
  if (!contextValue) {
    throw new Error('useFirebase must be used within FirebaseProvider.')
  }
  return contextValue
}
