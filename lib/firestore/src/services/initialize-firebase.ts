import { errorMessage } from '@echo/utils/error/error-message'
import { logger } from '@echo/utils/services/logger'
import { type App, cert, getApps, initializeApp } from 'firebase-admin/app'
import { getFirestore, initializeFirestore as firebaseInitializeFirestore } from 'firebase-admin/firestore'
import { head, isEmpty } from 'ramda'

export function initializeFirebase() {
  try {
    const apps = getApps()
    if (!isEmpty(apps)) {
      return getFirestore(head(apps) as App)
    }

    return firebaseInitializeFirestore(
      initializeApp({
        credential: cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: Buffer.from(process.env.FIREBASE_PRIVATE_KEY, 'base64').toString('ascii')
        })
      })
    ).settings({ ignoreUndefinedProperties: true })
  } catch (e) {
    logger.error(`error initializing firestore: ${errorMessage(e)}`)
  }
}
