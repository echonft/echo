import { errorMessage } from '@echo/utils/error/error-message'
import { logger } from '@echo/utils/services/logger'
import serviceAccount from '@test-utils/service-accout-key.json'
import { App, cert, getApps, initializeApp, type ServiceAccount } from 'firebase-admin/app'
import { getFirestore, initializeFirestore } from 'firebase-admin/firestore'
import { head, isEmpty } from 'ramda'

export async function initializeTestFirebase() {
  try {
    const apps = getApps()
    if (!isEmpty(apps)) {
      return getFirestore(head(apps) as App)
    }
    initializeFirestore(
      initializeApp({
        credential: cert(serviceAccount as ServiceAccount)
      })
    ).settings({ ignoreUndefinedProperties: true })
    return Promise.resolve()
  } catch (e) {
    logger.error(`error initializing Firebase test app: ${errorMessage(e)}`)
    return Promise.resolve()
  }
}
