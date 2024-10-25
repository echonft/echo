import { getFirebaseServiceAccount } from '@echo/firestore/services/get-firebase-service-account'
import { isNonEmptyArray } from '@echo/utils/fp/is-non-empty-array'
import { cert, getApps, initializeApp, type ServiceAccount } from 'firebase-admin/app'
import { initializeFirestore as firebaseInitializeFirestore } from 'firebase-admin/firestore'
import { isNil } from 'ramda'

interface InitializeFirebaseArgs {
  serviceAccount?: ServiceAccount
}

export async function initializeFirebase(args?: InitializeFirebaseArgs) {
  const apps = getApps()
  if (isNonEmptyArray(apps)) {
    return
  }
  const serviceAccount = args?.serviceAccount ?? (await getFirebaseServiceAccount())
  if (isNil(serviceAccount)) {
    return Promise.reject(Error('missing credentials'))
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
