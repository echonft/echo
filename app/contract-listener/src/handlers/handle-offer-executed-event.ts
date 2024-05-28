import { completeOffer } from '@echo/firestore/crud/offer/complete-offer'
import { getOfferByContactId } from '@echo/firestore/crud/offer/get-offer-by-contact-id'
import { pinoLogger } from '@echo/utils/services/pino-logger'
import type { HexString } from '@echo/utils/types/hex-string'
import { isNil } from 'ramda'

export function handleOfferExecutedEvent(offerId: HexString, transactionId: HexString) {
  void getOfferByContactId(offerId).then((offer) => {
    if (isNil(offer)) {
      pinoLogger.info(`Could not find offer ${offerId} after OfferExecutedEvent`)
      return
    }
    return completeOffer({
      slug: offer.slug,
      transactionId,
      updateArgs: { trigger: { by: 'OfferExecutedEvent', reason: 'ownership-changed' } }
    })
      .then((offer) => pinoLogger.info(`Updated offer ${offer.slug} after OfferExecutedEvent`))
      .catch((e) => pinoLogger.error('Error completing offer after OfferExecutedEvent: ', e))
  })
}
