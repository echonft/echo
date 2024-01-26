import { ListingOfferFulfillingStatus } from '@echo/firestore/types/model/listing-offer/listing-offer-fulfilling-status'
import { getListingItemsIds } from '@echo/model/helpers/listing/get-listing-items-ids'
import type { Listing } from '@echo/model/types/listing'
import type { ListingItem } from '@echo/model/types/listing-item'
import type { Offer } from '@echo/model/types/offer'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { intersection, length, map, path, pipe, prop } from 'ramda'

export function getListingItemsFulfillingStatusForOffer(listing: Listing) {
  return function (offer: Offer): ListingOfferFulfillingStatus {
    const listingItemIds = getListingItemsIds(listing)
    return pipe<[Offer], ListingItem[], string[], string[], number, ListingOfferFulfillingStatus>(
      prop('receiverItems'),
      map(nonNullableReturn(path(['nft', 'id']))),
      intersection(listingItemIds),
      length,
      (length: number) => {
        if (length === 0) {
          return ListingOfferFulfillingStatus.NONE
        }
        if (length === listingItemIds.length) {
          return ListingOfferFulfillingStatus.COMPLETELY
        }
        return ListingOfferFulfillingStatus.PARTIALLY
      }
    )(offer)
  }
}
