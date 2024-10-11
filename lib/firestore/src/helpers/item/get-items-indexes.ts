import { getItemsNftTokens } from '@echo/firestore/helpers/item/get-items-nft-tokens'
import type { ItemsDocumentData } from '@echo/firestore/types/model/item-document-data'
import type { Erc1155TokenDocumentData, Erc721TokenDocumentData } from '@echo/firestore/types/model/token-document-data'
import { getNftIndex } from '@echo/model/helpers/nft/get-nft-index'
import type { NftIndex } from '@echo/model/types/nft'
import { map, pipe, uniq } from 'ramda'

export function getItemsIndexes(items: ItemsDocumentData): NftIndex[] {
  return pipe<[ItemsDocumentData], (Erc721TokenDocumentData | Erc1155TokenDocumentData)[], NftIndex[], NftIndex[]>(
    getItemsNftTokens,
    map(getNftIndex),
    uniq
  )(items)
}
