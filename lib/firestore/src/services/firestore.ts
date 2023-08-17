import serviceAccount from '../service-accout-key.json'
import testServiceAccount from '../service-accout-key.test.json'
import { ServiceAccount } from 'firebase-admin'
import { App, cert, getApp, getApps, initializeApp } from 'firebase-admin/app'
import { Firestore, getFirestore } from 'firebase-admin/firestore'
import { isEmpty } from 'ramda'

function initializeFirestore(): App {
  const serviceAccountObj = process.env.NODE_ENV === 'test' ? testServiceAccount : serviceAccount
  const app = initializeApp({
    credential: cert(serviceAccountObj as ServiceAccount)
  })
  getFirestore().settings({ ignoreUndefinedProperties: true })
  return app
}

function adminFirebaseApp(): App {
  if (isEmpty(getApps())) {
    return initializeFirestore()
  }
  return getApp()
}

export function firestore(): Firestore {
  return getFirestore(adminFirebaseApp())
}
