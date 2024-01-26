import { ListingOfferFill } from '@echo/model/constants/listing-offer-fill'
import { getListingItemsFillForOffer } from '@echo/model/helpers/listing-offer/get-listing-items-fill-for-offer'
import { getListingTargetstFillForOffer } from '@echo/model/helpers/listing-offer/get-listing-targets-fill-for-offer'
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
export function getListingOffer(listing: Listing, offer: Offer): ListingOfferFill {
  return pipe(
    juxt([getListingItemsFillForOffer(listing), getListingTargetstFillForOffer(listing)]),
    apply(Math.max)
  )(offer)
}
