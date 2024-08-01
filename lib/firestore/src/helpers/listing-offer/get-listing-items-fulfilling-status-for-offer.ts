import { ListingOfferFulfillingStatus } from '@echo/firestore/types/model/listing-offer/listing-offer-fulfilling-status'
import { getNftIndex } from '@echo/model/helpers/nft/get-nft-index'
import type { Listing } from '@echo/model/types/listing'
import type { NftIndex, OwnedNft } from '@echo/model/types/nft'
import type { Offer } from '@echo/model/types/offer'
import { intersectionBy } from '@echo/utils/fp/intersection-by'
import { length, pipe, prop } from 'ramda'

export function getListingItemsFulfillingStatusForOffer(listing: Listing) {
  return function (offer: Offer): ListingOfferFulfillingStatus {
    return pipe<[Offer], OwnedNft[], NftIndex[], number, ListingOfferFulfillingStatus>(
      prop('receiverItems'),
      intersectionBy(getNftIndex, listing.items),
      length,
      (length: number) => {
        if (length === 0) {
          return ListingOfferFulfillingStatus.NONE
        }
        if (length === listing.items.length) {
          return ListingOfferFulfillingStatus.COMPLETELY
        }
        return ListingOfferFulfillingStatus.PARTIALLY
      }
    )(offer)
  }
}
