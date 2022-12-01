import { firebaseOptions } from '@echo/firebase'
import { App, cert, getApp, getApps, initializeApp } from 'firebase-admin/app'
import { isEmpty, isNil } from 'rambda'

/**
 * Returns an admin logged Firebase
 */
export function adminFirebaseApp(): App {
  const options = firebaseOptions
  if (isEmpty(getApps())) {
    const privateKey = process.env.FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY
    if (isNil(privateKey) || isEmpty(privateKey)) {
      throw new Error('.env should contain FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY')
    }
    return initializeApp({
      credential: cert({
        projectId: 'echo-83309',
        privateKey,
        clientEmail: 'firebase-adminsdk-12hv6@echo-83309.iam.gserviceaccount.com'
      }),
      databaseURL: options.databaseURL
    })
  }
  return getApp()
}
