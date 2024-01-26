import { ListingOfferFill } from '@echo/model/constants/listing-offer-fill'
import { getListingItemsIds } from '@echo/model/helpers/listing/get-listing-items-ids'
import type { Listing } from '@echo/model/types/listing'
import type { ListingItem } from '@echo/model/types/listing-item'
import type { Offer } from '@echo/model/types/offer'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { intersection, length, map, path, pipe, prop } from 'ramda'

export function getListingItemsFillForOffer(listing: Listing) {
  return function (offer: Offer): ListingOfferFill {
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
