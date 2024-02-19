import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { terminateFirestore } from '@echo/firestore/services/terminate-firestore'
import { validateOffers } from '@echo/tasks/offer/validate-offers'
import { pinoLogger } from '@echo/utils/services/pino-logger'

void (async function () {
  initializeFirebase()
  await validateOffers(pinoLogger)
  await terminateFirestore()
  process.exit()
})()
