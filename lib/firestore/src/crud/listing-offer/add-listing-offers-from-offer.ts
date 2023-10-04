import { getListingOffersByOfferId } from '@echo/firestore/crud/listing-offer/get-listing-offers-by-offer-id'
import { getListingOffersForOffer } from '@echo/firestore/crud/listing-offer/get-listing-offers-for-offer'
import { getListingOffersCollection } from '@echo/firestore/helpers/collection/get-listing-offers-collection'
import type { FirestoreListingOffer } from '@echo/firestore/types/model/listing-offer/firestore-listing-offer'
import type { FirestoreOffer } from '@echo/firestore/types/model/offer/firestore-offer'
import { isIn } from '@echo/utils/fp/is-in'
import { isNonEmptyArray } from '@echo/utils/fp/is-non-empty-array'
import { map, pipe, prop, reject } from 'ramda'

export async function addListingOffersFromOffer(offer: FirestoreOffer) {
  const listingOffers = await getListingOffersForOffer(offer)
  if (isNonEmptyArray(listingOffers)) {
    const existingListingOffers = await getListingOffersByOfferId(offer.id)
    const existingListingOffersListingIds = map(prop('listingId'), existingListingOffers)
    const newListingOffers = reject(pipe(prop('listingId'), isIn(existingListingOffersListingIds)), listingOffers)
    return Promise.all(
      map(async (newListingOffer) => {
        const reference = getListingOffersCollection().doc()
        const document = { id: reference.id, ...newListingOffer }
        await reference.set(document)
        return document as FirestoreListingOffer
      }, newListingOffers)
    )
  }
  return [] as FirestoreListingOffer[]
}
