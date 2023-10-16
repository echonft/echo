import { getListingOffersByListingId } from '@echo/firestore/crud/listing-offer/get-listing-offers-by-listing-id'
import { getListingOffersForListing } from '@echo/firestore/crud/listing-offer/get-listing-offers-for-listing'
import { getListingOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listing-offers-collection-reference'
import type { ListingOffer } from '@echo/firestore/types/model/listing-offer/listing-offer'
import type { Listing } from '@echo/model/types/listing'
import { isIn } from '@echo/utils/fp/is-in'
import { isNonEmptyArray } from '@echo/utils/fp/is-non-empty-array'
import { map, pipe, prop, reject } from 'ramda'

export async function addListingOffersFromListing(listing: Listing) {
  const listingOffers = await getListingOffersForListing(listing)
  if (isNonEmptyArray(listingOffers)) {
    const existingListingOffers = await getListingOffersByListingId(listing.id)
    const existingListingOffersOfferIds = map(prop('offerId'), existingListingOffers)
    const newListingOffers = reject(pipe(prop('offerId'), isIn(existingListingOffersOfferIds)), listingOffers)
    return Promise.all(
      map(async (newListingOffer) => {
        const reference = getListingOffersCollectionReference().doc()
        const document = { id: reference.id, ...newListingOffer }
        await reference.set(document)
        return document as ListingOffer
      }, newListingOffers)
    )
  }
  return [] as ListingOffer[]
}
