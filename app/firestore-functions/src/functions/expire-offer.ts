import { getLogger } from '@echo/firestore-functions/helper/get-logger'
import { setMaxInstances } from '@echo/firestore-functions/helper/set-max-instances'
import { expireOffer as firestoreExpireOffer } from '@echo/firestore/crud/offer/expire-offer'
import { withSlugSchema } from '@echo/model/validators/slug-schema'
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
    const logger = getLogger().child({ function: 'expireOffer' })
    try {
      const { slug } = withSlugSchema.parse(req.data)
      try {
        await firestoreExpireOffer({
          slug
        })
      } catch (err) {
        logger.error({ err, offer: { slug } }, 'error setting offer state to expired')
      }
    } catch (err) {
      logger.error({ err }, 'error parsing expireOffer body')
    }
  }
)
