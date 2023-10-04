import { offerItemsIncludeListingTargets } from '@echo/firestore/helpers/offer/offer-items-include-listing-targets'
import type { FirestoreListing } from '@echo/firestore/types/model/listing/firestore-listing'
import type { FirestoreOffer } from '@echo/firestore/types/model/offer/firestore-offer'

export function listingTargetsIncludeOfferSenderItems(listing: FirestoreListing) {
  return function (offer: FirestoreOffer) {
    return offerItemsIncludeListingTargets(offer.senderItems)(listing)
  }
}
