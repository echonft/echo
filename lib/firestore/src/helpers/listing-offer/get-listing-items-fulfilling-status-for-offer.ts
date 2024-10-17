import { ListingOfferFulfillingStatus } from '@echo/firestore/constants/listing-offer-fulfilling-status'
import { listingItemsIndexes } from '@echo/model/helpers/listing/listing-items-indexes'
import { nftIndex } from '@echo/model/helpers/nft/nft-index'
import type { Listing } from '@echo/model/types/listing/listing'
import type { NftIndex } from '@echo/model/types/nft/nft'
import type { OwnedNft } from '@echo/model/types/nft/owned-nft'
import type { Offer } from '@echo/model/types/offer/offer'
import { intersectionBy } from '@echo/utils/fp/intersection-by'
import { length, pipe, prop } from 'ramda'

export function getListingItemsFulfillingStatusForOffer(listing: Listing) {
  const listingItemsIndex = listingItemsIndexes(listing)
  return function (offer: Offer): ListingOfferFulfillingStatus {
    return pipe<[Offer], OwnedNft[], NftIndex[], number, ListingOfferFulfillingStatus>(
      prop('receiverItems'),
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
