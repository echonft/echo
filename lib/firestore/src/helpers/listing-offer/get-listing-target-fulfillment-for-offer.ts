import { ListingOfferFulfillingStatus } from '@echo/firestore/constants/listing-offer-fulfilling-status'
import { itemToken } from '@echo/model/helpers/item/item-token'
import { nftItems } from '@echo/model/helpers/item/nft-items'
import type { Item } from '@echo/model/types/item/item'
import type { NftItem } from '@echo/model/types/item/nft-item'
import type { Listing } from '@echo/model/types/listing/listing'
import type { Offer } from '@echo/model/types/offer/offer'
import type { Slug } from '@echo/model/types/slug'
import type { NftToken } from '@echo/model/types/token/nft-token'
import { equals, filter, length, map, path, pipe, prop } from 'ramda'

export function getListingTargetFillForOffer(listing: Listing) {
  return function (offer: Offer): ListingOfferFulfillingStatus {
    return pipe<[Offer], Item[], NftItem[], NftToken[], Slug[], Slug[], number, ListingOfferFulfillingStatus>(
      prop('senderItems'),
      nftItems,
      map(itemToken),
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
