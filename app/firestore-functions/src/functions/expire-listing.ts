import { getLogger } from '@echo/firestore-functions/helper/get-logger'
import { setMaxInstances } from '@echo/firestore-functions/helper/set-max-instances'
import { updateListingState } from '@echo/firestore/crud/listing/update-listing-state'
import { ListingState } from '@echo/model/constants/listing-state'
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
        await updateListingState(slug, ListingState.Expired)
      } catch (err) {
        logger.error({ err, listing: { slug } }, 'error setting listing state to expired')
      }
    } catch (err) {
      logger.error({ err }, 'error parsing expireListing body')
    }
  }
)
