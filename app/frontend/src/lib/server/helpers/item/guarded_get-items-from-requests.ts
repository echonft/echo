import type { ListingItemRequest } from '@echo/api/types/requests/listing-item-request'
import { type OfferItemRequest } from '@echo/api/types/requests/offer-item-request'
import { BadRequestError } from '@echo/frontend/lib/server/helpers/error/bad-request-error'
import { guarded_getNftById } from '@echo/frontend/lib/server/helpers/nft/guarded_get-nft-by-id'
import type { ListingItem } from '@echo/model/types/listing-item'
import { type OfferItem } from '@echo/model/types/offer-item'
import { assoc, isNil, map } from 'ramda'

export function guarded_getItemsFromRequests(
  itemRequests: OfferItemRequest[] | ListingItemRequest[]
): Promise<OfferItem[] | ListingItem[]> {
  return Promise.all(
    map(async (item) => {
      const { nft } = item
      const foundNft = await guarded_getNftById(nft.id)
      if (isNil(foundNft)) {
        throw new BadRequestError(`nft with id ${nft.id} not found in firestore while trying to get offer items`)
      }
      return assoc('nft', foundNft, item) as OfferItem
    }, itemRequests)
  )
}
