import { findListingById } from '@echo/firestore/crud/listing/find-listing-by-id'
import { findOfferById } from '@echo/firestore/crud/offer/find-offer-by-id'
import { getListingOffersCollection } from '@echo/firestore/helpers/collection/get-listing-offers-collection'
import type { FirestoreListingOffer } from '@echo/firestore/types/model/listing-offer/firestore-listing-offer'
import { ListingOfferFulfillingStatus } from '@echo/firestore/types/model/listing-offer/listing-offer-fulfilling-status'
import { isNil } from 'ramda'

export async function addListingOffer(
  listingId: string,
  offerId: string,
  fulfillingStatus: ListingOfferFulfillingStatus
): Promise<FirestoreListingOffer> {
  const listing = await findListingById(listingId)
  if (isNil(listing)) {
    throw Error(`trying to add a listing offer for listing id ${listingId} but this listing does not exist`)
  }
  const offer = await findOfferById(offerId)
  if (isNil(offer)) {
    throw Error(`trying to add a listing offer for offer id ${offerId} but this offer does not exist`)
  }
  const querySnapshot = await getListingOffersCollection()
    .where('listingId', '==', listingId)
    .where('offerId', '==', offerId)
    .get()
  if (!querySnapshot.empty) {
    throw Error(
      `trying to add a listing offer for listing id ${listingId} and offer id ${offerId} but this listing offer already exists`
    )
  }
  const reference = getListingOffersCollection().doc()
  const id = reference.id
  const newDocument: FirestoreListingOffer = { id, listingId, offerId, fulfillingStatus }
  await reference.set(newDocument)
  return newDocument
}
