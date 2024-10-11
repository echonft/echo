import { ListingOfferFulfillingStatus } from '@echo/firestore/constants/listing/listing-offer-fulfilling-status'
import { getListingItemsIndex } from '@echo/model/helpers/listing/get-listing-items-index'
import { getNftIndex } from '@echo/model/helpers/nft/get-nft-index'
import type { Listing } from '@echo/model/types/listing'
import type { NftIndex, OwnedNft } from '@echo/model/types/nft'
import type { Offer } from '@echo/model/types/offer'
import { intersectionBy } from '@echo/utils/fp/intersection-by'
import { length, pipe, prop } from 'ramda'

export function getListingItemsFulfillingStatusForOffer(listing: Listing) {
  const listingItemsIndex = getListingItemsIndex(listing)
  return function (offer: Offer): ListingOfferFulfillingStatus {
    return pipe<[Offer], OwnedNft[], NftIndex[], number, ListingOfferFulfillingStatus>(
      prop('receiverItems'),
      intersectionBy(getNftIndex, listingItemsIndex),
      length,
      (length: number) => {
        if (length === 0) {
          return ListingOfferFulfillingStatus.NONE
        }
        if (length === listingItemsIndex.length) {
          return ListingOfferFulfillingStatus.COMPLETELY
        }
        return ListingOfferFulfillingStatus.PARTIALLY
      }
    )(offer)
  }
}
