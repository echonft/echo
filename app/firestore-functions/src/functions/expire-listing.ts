import { getLogger } from '@echo/firestore-functions/helper/get-logger'
import { setMaxInstances } from '@echo/firestore-functions/helper/set-max-instances'
import { expireListing as firestoreExpireListing } from '@echo/firestore/crud/listing/expire-listing'
import { withSlugSchema } from '@echo/model/validators/slug-schema'
import { onTaskDispatched } from 'firebase-functions/v2/tasks'

export const expireListing = onTaskDispatched(
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
    const logger = getLogger().child({ function: 'expireListing' })
    try {
      const { slug } = withSlugSchema.parse(req.data)
      try {
        await firestoreExpireListing(slug)
      } catch (err) {
        logger.error({ err, listing: { slug } }, 'error setting listing state to expired')
      }
    } catch (err) {
      logger.error({ err }, 'error parsing expireListing body')
    }
  }
)
