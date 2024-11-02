import { nftIndexComparator } from '@echo/model/helpers/nft/nft-index-comparator'
import type { Erc721ItemIndex } from '@echo/model/types/item'

export function erc721ItemComparator(itemA: Erc721ItemIndex, itemB: Erc721ItemIndex): number {
  return nftIndexComparator(itemA.token, itemB.token)
}
