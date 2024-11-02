import { nftIndexComparator } from '@echo/model/helpers/nft/nft-index-comparator'

import type { Erc1155ItemIndex } from '@echo/model/types/item'

export function erc1155ItemComparator(itemA: Erc1155ItemIndex, itemB: Erc1155ItemIndex): number {
  const tokenDiff = nftIndexComparator(itemA.token, itemB.token)
  if (tokenDiff === 0) {
    return itemA.quantity - itemB.quantity
  }
  return tokenDiff
}
