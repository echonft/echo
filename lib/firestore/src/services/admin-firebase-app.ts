import serviceAccount from '../service-accout-key.json'
import { ServiceAccount } from 'firebase-admin'
import { App, cert, getApp, getApps, initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { isEmpty } from 'ramda'

function initializeFirestore(): App {
  const app = initializeApp({
    credential: cert(serviceAccount as ServiceAccount)
  })
  getFirestore().settings({ ignoreUndefinedProperties: true })
  return app
}

/**
 * Returns an admin logged Firebase
 */
export const adminFirebaseApp = (): App => (isEmpty(getApps()) ? initializeFirestore() : getApp())
