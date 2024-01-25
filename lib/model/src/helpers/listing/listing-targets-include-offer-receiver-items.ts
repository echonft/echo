import { offerItemsIncludeListingTargets } from '@echo/model/helpers/offer/offer-items-include-listing-targets'
import { type Listing } from '@echo/model/types/listing'
import { type Offer } from '@echo/model/types/offer'

export function listingTargetsIncludeOfferReceiverItems(listing: Listing) {
  return function (offer: Offer): boolean {
    return offerItemsIncludeListingTargets(offer.receiverItems)(listing)
  }
}
