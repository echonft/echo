import { addListingOffer } from '@echo/firestore/crud/listing-offer/add-listing-offer'
import { getListingOffersByOfferId } from '@echo/firestore/crud/listing-offer/get-listing-offers-by-offer-id'
import { getListingOffersForOffer } from '@echo/firestore/crud/listing-offer/get-listing-offers-for-offer'
import { type ListingOffer } from '@echo/firestore/types/model/listing-offer/listing-offer'
import { type Offer } from '@echo/model/types/offer'
import { isIn } from '@echo/utils/fp/is-in'
import { isNonEmptyArray } from '@echo/utils/fp/is-non-empty-array'
import { map, pipe, prop, reject } from 'ramda'

export async function addListingOffersFromOffer(offer: Offer) {
  const listingOffers = await getListingOffersForOffer(offer)
  if (isNonEmptyArray(listingOffers)) {
    const existingListingOffers = await getListingOffersByOfferId(offer.id)
    const existingListingOffersListingIds = map(prop('listingId'), existingListingOffers)
    const newListingOffers = reject(pipe(prop('listingId'), isIn(existingListingOffersListingIds)), listingOffers)
    return await Promise.all(
      map(({ listingId, offerId, fulfillingStatus }) => {
        return addListingOffer(listingId, offerId, fulfillingStatus)
      }, newListingOffers)
    )
  }
  return [] as ListingOffer[]
}
