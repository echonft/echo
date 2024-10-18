import { nftArrayIndex } from '@echo/firestore/array-indexers/nft/nft-array-index'
import type { ArrayIndex } from '@echo/firestore/types/array-index'
import type { Erc721Item } from '@echo/model/types/item/erc721-item'

export function erc721ArrayIndex(item: Erc721Item): ArrayIndex {
  return nftArrayIndex(item.token)
}
