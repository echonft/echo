import { errorMessage } from '@echo/utils/error/error-message'
import { logger } from '@echo/utils/services/logger'
import serviceAccount from '@test-utils/service-accout-key.json'
import { cert, initializeApp, type ServiceAccount } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

export async function initializeTestFirebase() {
  try {
    const app = initializeApp({
      credential: cert(serviceAccount as ServiceAccount)
    })
    getFirestore(app).settings({ ignoreUndefinedProperties: true })
    return Promise.resolve()
  } catch (e) {
    logger.error(`error initializing Firebase test app: ${errorMessage(e)}`)
    return Promise.resolve()
  }
}
