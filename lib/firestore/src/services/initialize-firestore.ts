import { FirestoreError } from '@echo/firestore/constants/errors/firestore-error'
import { getFirebaseServiceAccount } from '@echo/firestore/services/get-firebase-service-account'
import { isNonEmptyArray } from '@echo/utils/helpers/is-non-empty-array'
import { cert, getApps, initializeApp } from 'firebase-admin/app'
import { initializeFirestore as firebaseInitializeFirestore } from 'firebase-admin/firestore'
import { isNil } from 'ramda'

export async function initializeFirestore() {
  const apps = getApps()
  if (isNonEmptyArray(apps)) {
    return
  }
  const serviceAccount = await getFirebaseServiceAccount()
  if (isNil(serviceAccount)) {
    return Promise.reject(Error(FirestoreError.MissingCredentials))
  }
  try {
    const app = initializeApp({
      credential: cert(serviceAccount)
    })
    const firestore = firebaseInitializeFirestore(app)
    firestore.settings({ ignoreUndefinedProperties: true })
  } catch (_err) {
    return
  }
}
