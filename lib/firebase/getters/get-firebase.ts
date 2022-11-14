import { firebaseConfig } from '../config/config'
import * as admin from 'firebase-admin'

export function getFirebase() {
  const config = firebaseConfig()
  if (admin.apps.length === 0) {
    return admin.initializeApp({
      credential: admin.credential.cert(config.serviceAccountKey),
      databaseURL: config.options.databaseURL
    })
  }
  return admin.app()
}
