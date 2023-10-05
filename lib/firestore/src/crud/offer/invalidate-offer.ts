import { updateOfferState } from '@echo/firestore/crud/offer/update-offer-state'

export async function invalidateOffer(offerId: string) {
  await updateOfferState(offerId, 'INVALID')
}
