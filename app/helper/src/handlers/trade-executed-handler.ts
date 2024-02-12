import { OFFER_STATE_UPDATE_TRIGGER_BY_SYSTEM } from '@echo/firestore/constants/offer/offer-state-update-trigger-by-system'
import { completeOffer } from '@echo/firestore/crud/offer/complete-offer'
import { findOfferById } from '@echo/firestore/crud/offer/find-offer-by-id'
import { updateUserNfts } from '@echo/helper/services/nft/update-user-nfts'
import { logger } from '@echo/utils/services/logger'
import { isNotNil } from 'ramda'

export async function tradeExecutedHandler(offerId: string, transactionId: string) {
  logger.info(`trade executed: offerId ${offerId} transactionId ${transactionId}`)
  const offer = await findOfferById(offerId)
  if (isNotNil(offer)) {
    await completeOffer({
      offerId,
      transactionId,
      updateArgs: { trigger: { by: OFFER_STATE_UPDATE_TRIGGER_BY_SYSTEM } }
    })
    await updateUserNfts(offer.receiver)
    await updateUserNfts(offer.sender)
  }
}
