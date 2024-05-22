import { ListingOfferFulfillingStatus } from '@echo/firestore/types/model/listing-offer/listing-offer-fulfilling-status'
import { mapNftToNftIndex } from '@echo/model/helpers/nft/map-nft-to-nft-index'
import type { Listing } from '@echo/model/types/listing'
import type { Nft } from '@echo/model/types/nft'
import type { NftIndex } from '@echo/model/types/nft-index'
import type { Offer } from '@echo/model/types/offer'
import { intersection, length, map, pipe, prop } from 'ramda'

export function getListingItemsFulfillingStatusForOffer(listing: Listing) {
  return function (offer: Offer): ListingOfferFulfillingStatus {
    const listingItemIndexes = pipe(prop('items'), map(mapNftToNftIndex))(listing)
    return pipe<[Offer], Nft[], NftIndex[], NftIndex[], number, ListingOfferFulfillingStatus>(
      prop('receiverItems'),
      map(mapNftToNftIndex),
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
