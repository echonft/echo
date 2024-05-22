import { ListingOfferFulfillingStatus } from '@echo/firestore/types/model/listing-offer/listing-offer-fulfilling-status'
import type { Listing } from '@echo/model/types/listing'
import type { Nft } from '@echo/model/types/nft'
import type { Offer } from '@echo/model/types/offer'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { equals, filter, length, map, path, pipe, prop } from 'ramda'

export function getListingTargetFillForOffer(listing: Listing) {
  return function (offer: Offer): ListingOfferFulfillingStatus {
    return pipe<[Offer], Nft[], Lowercase<string>[], Lowercase<string>[], number, ListingOfferFulfillingStatus>(
      prop('senderItems'),
      map(nonNullableReturn(path(['collection', 'slug']))),
      filter(equals(listing.target.collection.slug)),
      length,
      (length: number) => {
        if (length === 0) {
          return ListingOfferFulfillingStatus.NONE
        }
        if (length >= listing.target.amount) {
          return ListingOfferFulfillingStatus.COMPLETELY
        }
        return ListingOfferFulfillingStatus.PARTIALLY
      }
    )(offer)
  }
}
