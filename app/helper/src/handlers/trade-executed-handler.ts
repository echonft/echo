import { completeOffer } from '@echo/firestore/crud/offer/complete-offer'
import { findOfferById } from '@echo/firestore/crud/offer/find-offer-by-id'
import { updateUserNfts } from '@echo/helper/services/nft/update-user-nfts'
import { isNotNil } from 'ramda'

export async function tradeExecutedHandler(offerId: string, transactionId: string) {
  const offer = await findOfferById(offerId)
  if (isNotNil(offer)) {
    await completeOffer(offer.id, transactionId)
    await updateUserNfts(offer.receiver)
    await updateUserNfts(offer.sender)
  }
}
