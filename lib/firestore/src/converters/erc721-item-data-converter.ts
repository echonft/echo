import { erc721TokenDataConverter } from '@echo/firestore/converters/erc721-token-data-converter'
import type { Erc721ItemDocumentData } from '@echo/firestore/types/model/erc721-token-document-data'
import type { Erc721Item } from '@echo/model/types/item/erc721-item'
import { bind, modify } from 'ramda'

export const erc721ItemDataConverter = {
  fromFirestore(documentData: Erc721ItemDocumentData): Erc721Item {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const boundDataConverter = bind(erc721TokenDataConverter.fromFirestore, erc721TokenDataConverter)
    return modify('token', boundDataConverter, documentData)
  },
  toFirestore(modelObject: Erc721Item): Erc721ItemDocumentData {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const boundDataConverter = bind(erc721TokenDataConverter.toFirestore, erc721TokenDataConverter)
    return modify('token', boundDataConverter, modelObject)
  }
}
