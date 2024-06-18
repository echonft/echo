import { getFirebaseServiceAccount } from '@echo/firestore/services/get-firebase-service-account'
import { isNonEmptyArray } from '@echo/utils/fp/is-non-empty-array'
import { getGCloudProjectId } from '@echo/utils/helpers/get-gcloud-project-id'
import type { WithLogger } from '@echo/utils/types/with-logger'
import { cert, getApps, initializeApp, type ServiceAccount } from 'firebase-admin/app'
import {
  type Firestore,
  getFirestore,
  initializeFirestore as firebaseInitializeFirestore
} from 'firebase-admin/firestore'
import { head, isNil, pipe } from 'ramda'

interface InitializeFirebaseArgs extends WithLogger {
  serviceAccount?: ServiceAccount
}

export async function initializeFirebase(args?: InitializeFirebaseArgs): Promise<Firestore> {
  const projectId = args?.serviceAccount?.projectId ?? getGCloudProjectId()
  const childLogger = args?.logger?.child({ component: 'firebase', project_id: projectId })
  const apps = getApps()
  if (isNonEmptyArray(apps)) {
    return pipe(head, getFirestore)(apps)
  }
  const serviceAccount = args?.serviceAccount ?? (await getFirebaseServiceAccount(childLogger))
  if (isNil(serviceAccount)) {
    childLogger?.fatal('missing credentials')
    throw Error('missing credentials')
  }
  try {
    const app = initializeApp({
      credential: cert(serviceAccount)
    })
    const firestore = firebaseInitializeFirestore(app)
    firestore.settings({ ignoreUndefinedProperties: true })
    childLogger?.info('initialized Firebase')
    return firestore
  } catch (err) {
    childLogger?.fatal({ err }, 'cannot initialize')
    return pipe(head, getFirestore)(apps)
  }
}
