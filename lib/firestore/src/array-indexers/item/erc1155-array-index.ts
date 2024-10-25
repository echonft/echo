import { nftArrayIndex } from '@echo/firestore/array-indexers/nft/nft-array-index'
import type { ArrayIndex } from '@echo/firestore/types/array-index'
import type { Erc1155Item } from '@echo/model/types/erc1155-item'

export function erc1155ArrayIndex(item: Erc1155Item): ArrayIndex {
  return nftArrayIndex(item.token)
}
