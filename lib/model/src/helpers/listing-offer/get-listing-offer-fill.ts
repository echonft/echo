import { ListingOfferFill } from '@echo/model/constants/listing-offer-fill'
import { getListingItemsIds } from '@echo/model/helpers/listing/get-listing-items-ids'
import type { Listing } from '@echo/model/types/listing'
import type { ListingItem } from '@echo/model/types/listing-item'
import type { ListingTarget } from '@echo/model/types/listing-target'
import type { Offer } from '@echo/model/types/offer'
import type { OfferItem } from '@echo/model/types/offer-item'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { apply, equals, filter, intersection, juxt, length, map, path, pipe, prop } from 'ramda'

function getListingTargetFill<T extends Offer>(offer: T) {
  return function (target: ListingTarget): ListingOfferFill {
    return pipe<[T], OfferItem[], string[], string[], number, ListingOfferFill>(
      prop('senderItems'),
      map(nonNullableReturn(path(['nft', 'collection', 'id']))),
      filter(equals(target.collection.id)),
      length,
      (length: number) => {
        if (length === 0) {
          return ListingOfferFill.NONE
        }
        if (length >= target.amount) {
          return ListingOfferFill.COMPLETE
        }
        return ListingOfferFill.PARTIAL
      }
    )(offer)
  }
}

function getListingTargetstFill(listing: Listing) {
  return function <T extends Offer>(offer: T): ListingOfferFill {
    return pipe(prop('targets'), map(getListingTargetFill(offer)), apply(Math.max))(listing)
  }
}

function getListingItemsFill(listing: Listing) {
  return function <T extends Offer>(offer: T): ListingOfferFill {
    const listingItemIds = getListingItemsIds(listing)
    return pipe<[Offer], ListingItem[], string[], string[], number, ListingOfferFill>(
      prop('receiverItems'),
      map(nonNullableReturn(path(['nft', 'id']))),
      intersection(listingItemIds),
      length,
      (length: number) => {
        if (length === 0) {
          return ListingOfferFill.NONE
        }
        if (length === listingItemIds.length) {
          return ListingOfferFill.COMPLETE
        }
        return ListingOfferFill.PARTIAL
      }
    )(offer)
  }
}

/**
 * For an offer to partially/completely fulfill a listing, it needs to:
 * 1) For any of listing targets
 *   a) sender items are in the same collection than the listing target
 *   b) the number or items >= the listing target amount
 * 2) receiver items are parts of/equal the listing items
 * @param {Listing} listing
 * @returns {<T extends Offer>(offer: T) => ListingOfferFill}
 */
export function getListingOfferFill(listing: Listing) {
  return function <T extends Offer>(offer: T): ListingOfferFill {
    return pipe(juxt([getListingItemsFill(listing), getListingTargetstFill(listing)]), apply(Math.max))(offer)
  }
}
