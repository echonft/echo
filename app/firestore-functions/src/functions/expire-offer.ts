import { OFFER_STATE_UPDATE_TRIGGER_BY_SYSTEM } from '@echo/firestore/constants/offer/offer-state-update-trigger-by-system'
import { updateOfferState } from '@echo/firestore/crud/offer/update-offer-state'
import { setMaxInstances } from '@echo/firestore-functions/helper/set-max-instances'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { slugSchema } from '@echo/utils/validators/slug-schema'
import { error } from 'firebase-functions/logger'
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
    try {
      const { slug } = slugSchema.parse(req.data)
      try {
        await updateOfferState({
          slug,
          state: 'EXPIRED',
          updateArgs: { trigger: { by: OFFER_STATE_UPDATE_TRIGGER_BY_SYSTEM } }
        })
      } catch (err) {
        error(`Error setting offer ${slug} state to expired: ${errorMessage(err)}`)
      }
    } catch (err) {
      error(`Error parsing expireOffer body: ${errorMessage(err)}`)
    }
  }
)
