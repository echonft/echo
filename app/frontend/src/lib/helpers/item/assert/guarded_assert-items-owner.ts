import { guarded_assertNftOwner } from '@echo/frontend/lib/helpers/nft/assert/guarded_assert-nft-owner'
import type { Item } from '@echo/model/types/item'
import { forEach } from 'ramda'

export function guarded_assertItemsOwner(items: Item[], username: string) {
  forEach((item: Item) => {
    guarded_assertNftOwner(item.nft, username)
  }, items)
}
