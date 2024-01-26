import { ListingOfferFill } from '@echo/model/constants/listing-offer-fill'
import { getListingOffer } from '@echo/model/helpers/listing-offer/get-listing-offer'
import type { Listing } from '@echo/model/types/listing'
import type { Offer } from '@echo/model/types/offer'

export function getListingOfferFillForOffer(listing: Listing) {
  return function (offer: Offer): ListingOfferFill {
    return getListingOffer(listing, offer)
  }
}
