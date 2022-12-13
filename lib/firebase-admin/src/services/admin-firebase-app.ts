import { firebaseOptions } from '@echo/firebase'
import { ServiceAccount } from 'firebase-admin'
import { App, cert, getApp, getApps, initializeApp } from 'firebase-admin/app'
import { isEmpty, isNil } from 'rambda'

/**
 * Returns an admin logged Firebase
 */
export function adminFirebaseApp(): App {
  if (isEmpty(getApps())) {
    const serviceAccount = JSON.parse(
      Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_KEY, 'base64').toString('utf8')
    ) as ServiceAccount
    if (isNil(serviceAccount) || isEmpty(serviceAccount)) {
      throw new Error('.env should contain FIREBASE_SERVICE_ACCOUNT_KEY')
    }
    return initializeApp({
      ...firebaseOptions,
      credential: cert(serviceAccount)
    })
  }
  return getApp()
}
