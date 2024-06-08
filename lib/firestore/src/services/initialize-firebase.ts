import { firestoreLogger } from '@echo/firestore/constants/firestore-logger'
import { isNonEmptyArray } from '@echo/utils/fp/is-non-empty-array'
import { getProjectId, getSecret } from '@echo/utils/services/secret-manager'
import { privateKeySchema } from '@echo/utils/validators/private-key-schema'
import { cert, getApps, initializeApp, type ServiceAccount } from 'firebase-admin/app'
import {
  type Firestore,
  getFirestore,
  initializeFirestore as firebaseInitializeFirestore
} from 'firebase-admin/firestore'
import { andThen, assoc, head, ifElse, isNil, pipe } from 'ramda'

async function getCredentials(): Promise<Omit<ServiceAccount, 'projectId'>> {
  const clientEmail = await getSecret('FIREBASE_CLIENT_EMAIL')
  const privateKey = await pipe(
    getSecret,
    andThen((key) => privateKeySchema.parse(key))
  )('FIREBASE_PRIVATE_KEY')
  if (isNil(clientEmail) || isNil(privateKey)) {
    throw Error(`credentials not found`)
  }
  return { clientEmail, privateKey }
}
export async function initializeFirebase(credentials?: Omit<ServiceAccount, 'projectId'>): Promise<Firestore> {
  const apps = getApps()
  if (isNonEmptyArray(apps)) {
    return getFirestore(head(apps))
  }
  const serviceAccount = await ifElse(
    isNil,
    pipe(getCredentials, andThen(assoc('projectId', getProjectId()))),
    assoc('projectId', getProjectId())
  )(credentials)
  const firestore = firebaseInitializeFirestore(
    initializeApp({
      credential: cert(serviceAccount)
    })
  )
  firestore.settings({ ignoreUndefinedProperties: true })
  firestoreLogger.info(`initialized Firebase for project ${getProjectId()}`)
  return firestore
}
