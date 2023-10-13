import { offerItemsIncludeListingTargets } from '@echo/firestore/helpers/offer/offer-items-include-listing-targets'
import type { Listing } from '@echo/model/types/listing'
import type { Offer } from '@echo/model/types/offer'

export function listingTargetsIncludeOfferReceiverItems(listing: Listing) {
  return function (offer: Offer) {
    return offerItemsIncludeListingTargets(offer.receiverItems)(listing)
  }
}
