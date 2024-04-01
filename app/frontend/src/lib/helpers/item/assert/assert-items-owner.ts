import { assertNftOwner } from '@echo/frontend/lib/helpers/nft/assert/assert-nft-owner'
import type { Item } from '@echo/model/types/item'
import { forEach } from 'ramda'

export function assertItemsOwner(items: Item[], username: string) {
  forEach((item: Item) => {
    assertNftOwner(item.nft, username)
  }, items)
}
