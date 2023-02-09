import { firebaseConfig } from '@echo/firestore'
import { getApps, initializeApp } from 'firebase/app'
import { isEmpty } from 'ramda'

export const useFirebase = (): void => {
  if (isEmpty(getApps())) {
    initializeApp(firebaseConfig)
    // TODO not needed for now, but will be when users can write to Firestore
    // getAuth(firebaseApp)
    //   .setPersistence(browserLocalPersistence)
    //   .catch((error) => {
    //     logger.error(`Can't set persistence on Firebase Auth: ${errorMessage(error)}`)
    //   })
  }
}
