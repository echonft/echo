import { firebaseConfig } from '@echo/firestore'
import { ServiceAccount } from 'firebase-admin'
import { App, cert, getApp, getApps, initializeApp } from 'firebase-admin/app'
import { isEmpty, isNil } from 'ramda'

/**
 * Returns an admin logged Firebase
 */
export function adminFirebaseApp(): App {
  if (isEmpty(getApps())) {
    const serviceAccount = JSON.parse(
      Buffer.from(process.env.FIREBASE_ADMIN_PRIVATE_KEY, 'base64').toString('utf8')
    ) as ServiceAccount
    if (isNil(serviceAccount) || isEmpty(serviceAccount)) {
      throw new Error('.env should contain FIREBASE_ADMIN_PRIVATE_KEY')
    }
    return initializeApp({
      ...firebaseConfig,
      credential: cert(serviceAccount)
    })
  }
  return getApp()
}
