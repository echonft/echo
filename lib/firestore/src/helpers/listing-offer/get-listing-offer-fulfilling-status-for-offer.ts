import { ListingOfferFulfillingStatus } from '@echo/firestore/constants/listing-offer-fulfilling-status'
import { getListingOfferFulfillingStatus } from '@echo/firestore/helpers/listing-offer/get-listing-offer-fulfilling-status'
import type { Listing } from '@echo/model/types/listing'
import type { Offer } from '@echo/model/types/offer'

export function getListingOfferFulfillingStatusForOffer(listing: Listing) {
  return function (offer: Offer): ListingOfferFulfillingStatus {
    return getListingOfferFulfillingStatus(listing, offer)
  }
}
