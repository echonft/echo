import { OfferError } from '@echo/firestore-functions/constants/errors/offer-error'
import { RequestError } from '@echo/firestore-functions/constants/errors/request-error'
import { error } from '@echo/firestore-functions/constants/logger'
import { setMaxInstances } from '@echo/firestore-functions/helpers/set-max-instances'
import type { ExpireOfferTaskArgs } from '@echo/firestore-functions/types/expire-offer-task-args'
import { expireOffer as firestoreExpireOffer } from '@echo/firestore/crud/offer/expire-offer'
import { withSlugSchema } from '@echo/model/validators/slug-schema'
import { onTaskDispatched } from 'firebase-functions/v2/tasks'

export const expireOffer = onTaskDispatched<ExpireOfferTaskArgs>(
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
        await firestoreExpireOffer(slug)
      } catch (err) {
        error({ err, offer: { slug } }, OfferError.Expire)
      }
    } catch (err) {
      error({ err }, RequestError.Parse)
    }
  }
)
