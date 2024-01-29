import { getListingOfferFulfillingStatus } from '@echo/firestore/helpers/listing-offer/get-listing-offer-fulfilling-status'
import { ListingOfferFulfillingStatus } from '@echo/firestore/types/model/listing-offer/listing-offer-fulfilling-status'
import type { Listing } from '@echo/model/types/listing'
import type { Offer } from '@echo/model/types/offer'

export function getListingOfferFulfillingStatusForListing(offer: Offer) {
  return function (listing: Listing): ListingOfferFulfillingStatus {
    return getListingOfferFulfillingStatus(listing, offer)
  }
}
