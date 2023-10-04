import { updateOfferState } from '@echo/firestore/crud/offer/update-offer-state'

export async function cancelOffer(offerId: string) {
  await updateOfferState(offerId, 'CANCELLED')
}
