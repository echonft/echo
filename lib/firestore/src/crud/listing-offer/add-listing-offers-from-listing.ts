import { getListingOffersByListingId } from '@echo/firestore/crud/listing-offer/get-listing-offers-by-listing-id'
import { getListingOffersForListing } from '@echo/firestore/crud/listing-offer/get-listing-offers-for-listing'
import { getListingOffersCollection } from '@echo/firestore/helpers/collection/get-listing-offers-collection'
import type { FirestoreListing } from '@echo/firestore/types/model/listing/firestore-listing'
import type { FirestoreListingOffer } from '@echo/firestore/types/model/listing-offer/firestore-listing-offer'
import { isIn } from '@echo/utils/fp/is-in'
import { isNonEmptyArray } from '@echo/utils/fp/is-non-empty-array'
import { map, pipe, prop, reject } from 'ramda'

export async function addListingOffersFromListing(listing: FirestoreListing) {
  const listingOffers = await getListingOffersForListing(listing)
  if (isNonEmptyArray(listingOffers)) {
    const existingListingOffers = await getListingOffersByListingId(listing.id)
    const existingListingOffersOfferIds = map(prop('offerId'), existingListingOffers)
    const newListingOffers = reject(pipe(prop('offerId'), isIn(existingListingOffersOfferIds)), listingOffers)
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
