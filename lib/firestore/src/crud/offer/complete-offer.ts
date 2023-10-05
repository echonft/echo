import { updateOfferState } from '@echo/firestore/crud/offer/update-offer-state'
import { addSwap } from '@echo/firestore/crud/swaps/add-swap'

export async function completeOffer(offerId: string, swapTransactionId: string) {
  await updateOfferState(offerId, 'COMPLETED')
  // add swap
  await addSwap(offerId, swapTransactionId)
}
