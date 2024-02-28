import { type ItemRequest } from '@echo/api/types/requests/item-request'
import type { Item } from '@echo/model/types/item'
import { type Nft } from '@echo/model/types/nft'
import type { WithId } from '@echo/model/types/with-id'
import { map, modify, pick } from 'ramda'

export function mapItemsToRequests(items: Item[]) {
  return map<Item, ItemRequest>(modify<'nft', Nft, WithId>('nft', pick(['id'])), items)
}
