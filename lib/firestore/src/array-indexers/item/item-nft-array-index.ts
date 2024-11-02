import { erc1155ArrayIndex } from '@echo/firestore/array-indexers/item/erc1155-array-index'
import { erc721ArrayIndex } from '@echo/firestore/array-indexers/item/erc721-array-index'
import type { ArrayIndex } from '@echo/firestore/types/array-index'
import { isErc721Item } from '@echo/model/helpers/item/is-erc721-item'
import type { NftItem } from '@echo/model/types/item'

export function itemNftArrayIndex(item: NftItem): ArrayIndex {
  if (isErc721Item(item)) {
    return erc721ArrayIndex(item)
  }
  return erc1155ArrayIndex(item)
}
