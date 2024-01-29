import { getListingItemsFulfillingStatusForOffer } from '@echo/firestore/helpers/listing-offer/get-listing-items-fulfilling-status-for-offer'
import { getListingTargetstFillForOffer } from '@echo/firestore/helpers/listing-offer/get-listing-targets-fulfilling-status-for-offer'
import { ListingOfferFulfillingStatus } from '@echo/firestore/types/model/listing-offer/listing-offer-fulfilling-status'
import type { Listing } from '@echo/model/types/listing'
import type { Offer } from '@echo/model/types/offer'
import { apply, juxt, pipe } from 'ramda'

/**
 * For an offer to partially/completely fulfill a listing, it needs to:
 * 1) For any of listing targets
 *   a) sender items are in the same collection than the listing target
 *   b) the number or items >= the listing target amount
 * 2) receiver items are parts of/equal the listing items
 */
export function getListingOfferFulfillingStatus(listing: Listing, offer: Offer): ListingOfferFulfillingStatus {
  return pipe(
    juxt([getListingItemsFulfillingStatusForOffer(listing), getListingTargetstFillForOffer(listing)]),
    apply(Math.min)
  )(offer)
}
