import { firestoreLogger } from '@echo/firestore/constants/firestore-logger'
import { getFirebaseCredentials } from '@echo/firestore/services/get-firebase-credentials'
import { isNonEmptyArray } from '@echo/utils/fp/is-non-empty-array'
import { getGCloudProjectId } from '@echo/utils/helpers/get-gcloud-project-id'
import { cert, getApps, initializeApp, type ServiceAccount } from 'firebase-admin/app'
import {
  type Firestore,
  getFirestore,
  initializeFirestore as firebaseInitializeFirestore
} from 'firebase-admin/firestore'
import { always, andThen, assoc, head, ifElse, isNil, pipe } from 'ramda'

export async function initializeFirebase(credentials?: Omit<ServiceAccount, 'projectId'>): Promise<Firestore> {
  const apps = getApps()
  if (isNonEmptyArray(apps)) {
    return pipe(head, getFirestore)(apps)
  }
  const serviceAccount = await ifElse(
    isNil,
    pipe(always(firestoreLogger), getFirebaseCredentials, andThen(assoc('projectId', getGCloudProjectId()))),
    assoc('projectId', getGCloudProjectId())
  )(credentials)
  try {
    const app = initializeApp({
      credential: cert(serviceAccount)
    })
    const firestore = firebaseInitializeFirestore(app)
    firestore.settings({ ignoreUndefinedProperties: true })
    firestoreLogger.info('initialized Firebase')
    return firestore
  } catch (e) {
    return pipe(getApps, head, getFirestore)()
  }
}
