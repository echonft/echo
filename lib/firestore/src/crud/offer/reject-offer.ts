import { updateOfferState } from '@echo/firestore/crud/offer/update-offer-state'

export async function rejectOffer(offerId: string) {
  return await updateOfferState(offerId, 'REJECTED')
}
