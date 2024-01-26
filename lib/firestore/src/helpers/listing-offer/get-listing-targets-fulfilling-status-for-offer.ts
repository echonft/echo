import { ListingOfferFulfillingStatus } from '@echo/firestore/types/model/listing-offer/listing-offer-fulfilling-status'
import type { Listing } from '@echo/model/types/listing'
import type { ListingTarget } from '@echo/model/types/listing-target'
import type { Offer } from '@echo/model/types/offer'
import type { OfferItem } from '@echo/model/types/offer-item'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { apply, equals, filter, length, map, path, pipe, prop } from 'ramda'

function getListingTargetFillForOffer(offer: Offer) {
  return function (target: ListingTarget): ListingOfferFulfillingStatus {
    return pipe<[Offer], OfferItem[], string[], string[], number, ListingOfferFulfillingStatus>(
      prop('senderItems'),
      map(nonNullableReturn(path(['nft', 'collection', 'id']))),
      filter(equals(target.collection.id)),
      length,
      (length: number) => {
        if (length === 0) {
          return ListingOfferFulfillingStatus.NONE
        }
        if (length >= target.amount) {
          return ListingOfferFulfillingStatus.COMPLETELY
        }
        return ListingOfferFulfillingStatus.PARTIALLY
      }
    )(offer)
  }
}

export function getListingTargetstFillForOffer(listing: Listing) {
  return function (offer: Offer): ListingOfferFulfillingStatus {
    return pipe(prop('targets'), map(getListingTargetFillForOffer(offer)), apply(Math.max))(listing)
  }
}
