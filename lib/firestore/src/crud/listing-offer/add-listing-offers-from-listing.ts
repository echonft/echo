import { addListingOffer } from '@echo/firestore/crud/listing-offer/add-listing-offer'
import { getListingOffersByListingId } from '@echo/firestore/crud/listing-offer/get-listing-offers-by-listing-id'
import { getListingOffersForListing } from '@echo/firestore/crud/listing-offer/get-listing-offers-for-listing'
import { type ListingOffer } from '@echo/firestore/types/model/listing-offer/listing-offer'
import { type Listing } from '@echo/model/types/listing'
import { isIn } from '@echo/utils/fp/is-in'
import { isNonEmptyArray } from '@echo/utils/fp/is-non-empty-array'
import { map, pipe, prop, reject } from 'ramda'

export async function addListingOffersFromListing(listing: Listing) {
  const listingOffers = await getListingOffersForListing(listing)
  if (isNonEmptyArray(listingOffers)) {
    const existingListingOffers = await getListingOffersByListingId(listing.id)
    const existingListingOffersOfferIds = map(prop('offerId'), existingListingOffers)
    const newListingOffers = reject(pipe(prop('offerId'), isIn(existingListingOffersOfferIds)), listingOffers)
    return await Promise.all(
      map(({ listingId, offerId, fulfillingStatus }) => {
        return addListingOffer(listingId, offerId, fulfillingStatus)
      }, newListingOffers)
    )
  }
  return [] as ListingOffer[]
}
