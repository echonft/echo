import { erc1155TokenDataConverter } from '@echo/firestore/converters/erc1155-token-data-converter'
import type { Erc1155ItemDocumentData } from '@echo/firestore/types/model/erc1155-item-document-data'
import type { Erc1155Item } from '@echo/model/types/item/erc1155-item'
import { bind, modify } from 'ramda'

export const erc1155ItemDataConverter = {
  fromFirestore(documentData: Erc1155ItemDocumentData): Erc1155Item {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const boundDataConverter = bind(erc1155TokenDataConverter.fromFirestore, erc1155TokenDataConverter)
    return modify('token', boundDataConverter, documentData)
  },
  toFirestore(modelObject: Erc1155Item): Erc1155ItemDocumentData {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const boundDataConverter = bind(erc1155TokenDataConverter.toFirestore, erc1155TokenDataConverter)
    return modify('token', boundDataConverter, modelObject)
  }
}
