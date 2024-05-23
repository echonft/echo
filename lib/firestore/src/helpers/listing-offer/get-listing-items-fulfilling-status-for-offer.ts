import { ListingOfferFulfillingStatus } from '@echo/firestore/types/model/listing-offer/listing-offer-fulfilling-status'
import { getNftIndex } from '@echo/model/helpers/nft/get-nft-index'
import type { Listing } from '@echo/model/types/listing'
import type { Nft } from '@echo/model/types/nft'
import type { NftIndex } from '@echo/model/types/nft-index'
import type { Offer } from '@echo/model/types/offer'
import { intersection, length, map, pipe, prop } from 'ramda'

export function getListingItemsFulfillingStatusForOffer(listing: Listing) {
  return function (offer: Offer): ListingOfferFulfillingStatus {
    const listingItemIndexes = pipe(prop('items'), map(getNftIndex))(listing)
    return pipe<[Offer], Nft[], NftIndex[], NftIndex[], number, ListingOfferFulfillingStatus>(
      prop('receiverItems'),
      map(getNftIndex),
      intersection(listingItemIndexes),
      length,
      (length: number) => {
        if (length === 0) {
          return ListingOfferFulfillingStatus.NONE
        }
        if (length === listingItemIndexes.length) {
          return ListingOfferFulfillingStatus.COMPLETELY
        }
        return ListingOfferFulfillingStatus.PARTIALLY
      }
    )(offer)
  }
}
