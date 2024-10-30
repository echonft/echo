import { ListingError } from '@echo/firestore-functions/constants/errors/listing-error'
import { RequestError } from '@echo/firestore-functions/constants/errors/request-error'
import { error } from '@echo/firestore-functions/constants/logger'
import { setMaxInstances } from '@echo/firestore-functions/helpers/set-max-instances'
import type { ExpireListingTaskArgs } from '@echo/firestore-functions/types/expire-listing-task-args'
import { expireListing as firestoreExpireListing } from '@echo/firestore/crud/listing/expire-listing'
import { withSlugSchema } from '@echo/model/validators/slug-schema'
import { onTaskDispatched } from 'firebase-functions/v2/tasks'

export const expireListing = onTaskDispatched<ExpireListingTaskArgs>(
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
      const { slug } = withSlugSchema.parse(req.data)
      try {
        await firestoreExpireListing(slug)
      } catch (err) {
        error({ err, listing: { slug } }, ListingError.Expire)
      }
    } catch (err) {
      error({ err }, RequestError.Parse)
    }
  }
)
