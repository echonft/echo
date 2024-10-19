import { ListingOfferFulfillingStatus } from '@echo/firestore/constants/listing-offer-fulfilling-status'
import { itemToken } from '@echo/model/helpers/item/item-token'
import { nftItems } from '@echo/model/helpers/item/nft-items'
import { listingItemsIndexes } from '@echo/model/helpers/listing/listing-items-indexes'
import { nftIndex } from '@echo/model/helpers/nft/nft-index'
import type { Item } from '@echo/model/types/item/item'
import type { NftItem } from '@echo/model/types/item/nft-item'
import type { Listing } from '@echo/model/types/listing/listing'
import type { NftIndex } from '@echo/model/types/nft/nft'
import type { Offer } from '@echo/model/types/offer/offer'
import type { NftToken } from '@echo/model/types/token/nft-token'
import { intersectionBy } from '@echo/utils/fp/intersection-by'
import { length, map, type NonEmptyArray, pipe, prop } from 'ramda'

export function getListingItemsFulfillingStatusForOffer(listing: Listing) {
  const listingItemsIndex = listingItemsIndexes(listing)
  return function (offer: Offer): ListingOfferFulfillingStatus {
    return pipe<[Offer], NonEmptyArray<Item>, NftItem[], NftToken[], NftIndex[], number, ListingOfferFulfillingStatus>(
      prop('receiverItems'),
      nftItems,
      map(itemToken),
      intersectionBy(nftIndex, listingItemsIndex),
      length,
      (length: number) => {
        if (length === 0) {
          return ListingOfferFulfillingStatus.None
        }
        if (length === listingItemsIndex.length) {
          return ListingOfferFulfillingStatus.Completely
        }
        return ListingOfferFulfillingStatus.Partially
      }
    )(offer)
  }
}
