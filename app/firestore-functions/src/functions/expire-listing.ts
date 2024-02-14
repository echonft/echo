import { updateListingState } from '@echo/firestore/crud/listing/update-listing-state'
import { setMaxInstances } from '@echo/firestore-functions/helper/set-max-instances'
import { LISTING_STATE_EXPIRED } from '@echo/model/constants/listing-states'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { error } from 'firebase-functions/logger'
import { onTaskDispatched } from 'firebase-functions/v2/tasks'
import { z } from 'zod'

const requestSchema = z.object({
  listingId: z.string().min(1)
})

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
    try {
      const { listingId } = requestSchema.parse(req.data)
      try {
        await updateListingState(listingId, LISTING_STATE_EXPIRED)
      } catch (err) {
        error(`Error setting listing ${listingId} state to expired: ${errorMessage(err)}`)
      }
    } catch (err) {
      error(`Error parsing expireListing body: ${errorMessage(err)}`)
    }
  }
)
