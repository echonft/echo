import type { ItemDocumentData, ItemsDocumentData } from '@echo/firestore/types/model/item-document-data'
import type { Erc1155TokenDocumentData, Erc721TokenDocumentData } from '@echo/firestore/types/model/token-document-data'
import { flatten, juxt, map, pipe, prop } from 'ramda'

function getErc721Tokens(items: ItemsDocumentData): Erc721TokenDocumentData[] {
  return pipe(
    prop('erc721'),
    map<ItemDocumentData<Erc721TokenDocumentData>, Erc721TokenDocumentData>(prop('token'))
  )(items)
}

function getErc1155Tokens(items: ItemsDocumentData): Erc1155TokenDocumentData[] {
  return pipe(
    prop('erc1155'),
    map<ItemDocumentData<Erc1155TokenDocumentData>, Erc1155TokenDocumentData>(prop('token'))
  )(items)
}

export function getItemsNftTokens(items: ItemsDocumentData): (Erc721TokenDocumentData | Erc1155TokenDocumentData)[] {
  return pipe(juxt([getErc721Tokens, getErc1155Tokens]), flatten)(items)
}
