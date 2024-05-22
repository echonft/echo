import type { ItemRequest } from '@echo/api/types/requests/item-request'
import { getNftById } from '@echo/firestore/crud/nft/get-nft-by-id'
import type { Item } from '@echo/model/types/item'
import { type OfferItem } from '@echo/model/types/offer-item'
import { assoc, isNil, map } from 'ramda'

export function getItemsFromRequests(itemRequests: ItemRequest[]): Promise<Item[]> {
  return Promise.all(
    map(async (item) => {
      const { nft } = item
      const foundNft = await getNftById(nft.id)
      if (isNil(foundNft)) {
        throw Error(`nft with id ${nft.id} not found in firestore while trying to get offer items`)
      }
      return assoc('nft', foundNft, item) as OfferItem
    }, itemRequests)
  )
}
