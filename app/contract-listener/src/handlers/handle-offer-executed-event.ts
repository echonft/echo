import { OFFER_STATE_UPDATE_TRIGGER_BY_SYSTEM } from '@echo/firestore/constants/offer/offer-state-update-trigger-by-system'
import { completeOffer } from '@echo/firestore/crud/offer/complete-offer'
import { getOfferByContactId } from '@echo/firestore/crud/offer/get-offer-by-contact-id'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { pinoLogger } from '@echo/utils/services/pino-logger'
import type { HexString } from '@echo/utils/types/hex-string'
import { isNil } from 'ramda'

export async function handleOfferExecutedEvent(offerId: HexString, transactionId: HexString) {
  try {
    const offer = await getOfferByContactId(offerId)
    if (isNil(offer)) {
      pinoLogger.info(`Could not find offer ${offerId} after OfferExecutedEvent`)
      return
    }
    try {
      await completeOffer({
        slug: offer.slug,
        transactionId,
        updateArgs: { trigger: { by: OFFER_STATE_UPDATE_TRIGGER_BY_SYSTEM } }
      })
      pinoLogger.info(`Completed offer ${offer.slug}`)
    } catch (err) {
      pinoLogger.error(`Error completing offer after OfferExecutedEvent: ${errorMessage(err)}`)
    }
  } catch (err) {
    pinoLogger.error(`Error fetching offer ${offerId} from Firestore after OfferExecutedEvent: ${errorMessage(err)}`)
  }
}
