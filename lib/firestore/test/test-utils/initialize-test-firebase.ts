import { errorMessage } from '@echo/utils/error/error-message'
import { logger } from '@echo/utils/services/logger'
import serviceAccount from '@test-utils/service-accout-key.json'
import { cert, initializeApp, ServiceAccount } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

export function initializeTestFirebase() {
  try {
    const app = initializeApp({
      credential: cert(serviceAccount as ServiceAccount)
    })
    getFirestore(app).settings({ ignoreUndefinedProperties: true })
  } catch (e) {
    logger.error(`error initializing Firebase test app: ${errorMessage(e)}`)
    throw e
  }
}
