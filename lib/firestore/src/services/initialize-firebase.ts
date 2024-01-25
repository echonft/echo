import { isNonEmptyArray } from '@echo/utils/fp/is-non-empty-array'
import { cert, getApps, initializeApp } from 'firebase-admin/app'
import {
  type Firestore,
  getFirestore,
  initializeFirestore as firebaseInitializeFirestore
} from 'firebase-admin/firestore'
import { head, isEmpty, isNil } from 'ramda'

export function initializeFirebase(): Firestore {
  const apps = getApps()
  if (isNonEmptyArray(apps)) {
    return getFirestore(head(apps))
  }
  const projectId = process.env.FIREBASE_PROJECT_ID
  if (isNil(projectId) || isEmpty(projectId)) {
    throw new Error('.env should contain FIREBASE_PROJECT_ID')
  }
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL
  if (isNil(clientEmail) || isEmpty(clientEmail)) {
    throw new Error('.env should contain FIREBASE_CLIENT_EMAIL')
  }
  const privateKey = process.env.FIREBASE_PRIVATE_KEY
  if (isNil(privateKey) || isEmpty(privateKey)) {
    throw new Error('.env should contain FIREBASE_PRIVATE_KEY')
  }
  const firestore = firebaseInitializeFirestore(
    initializeApp({
      credential: cert({
        projectId,
        clientEmail,
        privateKey: Buffer.from(privateKey, 'base64').toString('ascii')
      })
    })
  )
  firestore.settings({ ignoreUndefinedProperties: true })
  return firestore
}
