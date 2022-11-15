import { firebaseOptions } from '@echo/firebase/config/config'
import * as admin from 'firebase-admin'
import { isEmpty, isNil } from 'ramda'

/**
 * Returns an admin logged Firebase
 */
export function getAdminFirebase(): admin.app.App {
  const options = firebaseOptions
  if (admin.apps.length === 0) {
    if (isNil(process.env.FIREBASE_SERVICE_ACCOUNT_KEY) || isEmpty(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)) {
      throw new Error('.env should contain FIREBASE_SERVICE_ACCOUNT_KEY')
    }
    return admin.initializeApp({
      credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY).serviceAccountKey),
      databaseURL: options.databaseURL
    })
  }
  return admin.app()
}
