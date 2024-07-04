import { getLogger } from '@echo/firestore-functions/helper/get-logger'
import { setMaxInstances } from '@echo/firestore-functions/helper/set-max-instances'
import { updateOfferState } from '@echo/firestore/crud/offer/update-offer-state'
import { slugSchema } from '@echo/utils/validators/slug-schema'
import { onTaskDispatched } from 'firebase-functions/v2/tasks'

export const expireOffer = onTaskDispatched(
  setMaxInstances({
    retryConfig: {
      maxAttempts: 5,
      minBackoffSeconds: 10
    },
    rateLimits: {
      maxConcurrentDispatches: 10
    }
  }),
  async (req) => {
    const logger = getLogger().child({ fn: 'expireOffer' })
    try {
      const { slug } = slugSchema.parse(req.data)
      try {
        await updateOfferState({
          slug,
          state: 'EXPIRED'
        })
      } catch (err) {
        logger.error({ err, offer: { slug } }, 'error setting offer state to expired')
      }
    } catch (err) {
      logger.error({ err }, 'error parsing expireOffer body')
    }
  }
)
