import serviceAccount from '../service-accout-key.json'
import testServiceAccount from '../service-accout-key.test.json'
import { ServiceAccount } from 'firebase-admin'
import { cert, initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

export function initializeFirebase() {
  try {
    const serviceAccountObj = process.env.NODE_ENV === 'test' ? testServiceAccount : serviceAccount
    const app = initializeApp({
      credential: cert(serviceAccountObj as ServiceAccount)
    })
    getFirestore(app).settings({ ignoreUndefinedProperties: true })
  } catch (e) {
    return
  }
}
