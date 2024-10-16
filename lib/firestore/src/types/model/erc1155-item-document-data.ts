import type { Erc1155TokenDocumentData } from '@echo/firestore/types/model/erc1155-token-document-data'
import type { Erc1155Item } from '@echo/model/types/item/erc1155-item'

export interface Erc1155ItemDocumentData extends Omit<Erc1155Item, 'token'> {
  token: Erc1155TokenDocumentData
}
