import { addListingOffer } from '@echo/firestore/crud/listing-offer/add-listing-offer'
import { getListingOffersByListing } from '@echo/firestore/crud/listing-offer/get-listing-offers-by-listing'
import { getListingOffersForListing } from '@echo/firestore/crud/listing-offer/get-listing-offers-for-listing'
import { type ListingOffer } from '@echo/firestore/types/model/listing-offer/listing-offer'
import type { NewDocument } from '@echo/firestore/types/new-document'
import { type Listing } from '@echo/model/types/listing'
import { isIn } from '@echo/utils/fp/is-in'
import { isNonEmptyArray } from '@echo/utils/fp/is-non-empty-array'
import { andThen, map, pipe, prop, propSatisfies, reject } from 'ramda'

export async function addListingOffersFromListing(listing: Listing): Promise<NewDocument<ListingOffer>[]> {
  const listingOffers = await getListingOffersForListing(listing)
  if (isNonEmptyArray(listingOffers)) {
    const existingListingOffersOfferIds = await pipe(
      prop('slug'),
      getListingOffersByListing,
      andThen(map(prop('offerId')))
    )(listing)
    const newListingOffers = reject(propSatisfies(isIn(existingListingOffersOfferIds), 'offerId'), listingOffers)
    const listingOffersNewDocuments = []
    for (const newListingOffer of newListingOffers) {
      const newDocument = await addListingOffer(newListingOffer)
      listingOffersNewDocuments.push(newDocument)
    }
    return listingOffersNewDocuments
  }
  return []
}
