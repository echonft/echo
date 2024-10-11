import type {
  Erc1155TokenDocumentData,
  Erc20TokenDocumentData,
  Erc721TokenDocumentData
} from '@echo/firestore/types/model/token-document-data'
import type { Token } from '@echo/model/types/token'

type TokenDocumentData = Token

export interface ItemDocumentData<T extends TokenDocumentData> {
  token: T
  quantity: T extends Erc721TokenDocumentData ? 1 : number
}

export interface ItemsDocumentData {
  erc20: ItemDocumentData<Erc20TokenDocumentData>[]
  erc721: ItemDocumentData<Erc721TokenDocumentData>[]
  erc1155: ItemDocumentData<Erc1155TokenDocumentData>[]
}
