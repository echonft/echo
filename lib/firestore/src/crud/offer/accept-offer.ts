import { updateOfferState } from '@echo/firestore/crud/offer/update-offer-state'

export async function acceptOffer(offerId: string) {
  await updateOfferState(offerId, 'ACCEPTED')
}
