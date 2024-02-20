import { setMaxInstances } from '@echo/firestore-functions/helper/set-max-instances'
import { FirestoreFunctionsLogger } from '@echo/firestore-functions/services/firestore-functions-logger'
import { validateOffers } from '@echo/tasks/offer/validate-offers'
import { onSchedule } from 'firebase-functions/v2/scheduler'

export const validateOffersScheduled = onSchedule(
  setMaxInstances({ schedule: 'every 1 hours', timeoutSeconds: 540 }),
  async () => {
    const logger = new FirestoreFunctionsLogger()
    await validateOffers(logger)
  }
)
