import { ListingOfferFulfillingStatus } from '@echo/firestore/constants/listing-offer-fulfilling-status'
import type { Listing } from '@echo/model/types/listing/listing'
import type { Nft } from '@echo/model/types/nft/nft'
import type { Offer } from '@echo/model/types/offer/offer'
import type { Slug } from '@echo/model/types/slug'
import { equals, filter, length, map, path, pipe, prop } from 'ramda'

export function getListingTargetFillForOffer(listing: Listing) {
  return function (offer: Offer): ListingOfferFulfillingStatus {
    return pipe<[Offer], Nft[], Slug[], Slug[], number, ListingOfferFulfillingStatus>(
      prop('senderItems'),
      map(path(['collection', 'slug'])),
      filter(equals(listing.target.collection.slug)),
      length,
      (length: number) => {
        if (length === 0) {
          return ListingOfferFulfillingStatus.None
        }
        if (length >= listing.target.quantity) {
          return ListingOfferFulfillingStatus.Completely
        }
        return ListingOfferFulfillingStatus.Partially
      }
    )(offer)
  }
}
