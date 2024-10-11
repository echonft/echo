import { erc1155TokenDataConverter, erc721TokenDataConverter } from '@echo/firestore/converters/token-data-converter'
import type { ItemDocumentData, ItemsDocumentData } from '@echo/firestore/types/model/item-document-data'
import type { Erc1155TokenDocumentData, Erc721TokenDocumentData } from '@echo/firestore/types/model/token-document-data'
import type { Item, Items } from '@echo/model/types/item'
import type { Erc1155Token, Erc721Token } from '@echo/model/types/token'
import { FieldValue, type WithFieldValue } from 'firebase-admin/firestore'
import { bind, map, modify, pipe } from 'ramda'

export const erc721TokenItemDataConverter = {
  fromFirestore(documentData: ItemDocumentData<Erc721TokenDocumentData>): Item<Erc721Token> {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const boundDataConverter = bind(erc721TokenDataConverter.fromFirestore, erc721TokenDataConverter)
    return modify('token', boundDataConverter, documentData)
  },
  toFirestore(modelObject: Item<Erc721Token>): ItemDocumentData<Erc721TokenDocumentData> {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const boundDataConverter = bind(erc721TokenDataConverter.toFirestore, erc721TokenDataConverter)
    return modify('token', boundDataConverter, modelObject)
  }
}

export const erc1155TokenItemDataConverter = {
  fromFirestore(documentData: ItemDocumentData<Erc1155TokenDocumentData>): Item<Erc1155Token> {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const boundDataConverter = bind(erc1155TokenDataConverter.fromFirestore, erc1155TokenDataConverter)
    return modify('token', boundDataConverter, documentData)
  },
  toFirestore(modelObject: Item<Erc1155Token>): ItemDocumentData<Erc1155TokenDocumentData> {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const boundDataConverter = bind(erc1155TokenDataConverter.toFirestore, erc1155TokenDataConverter)
    return modify('token', boundDataConverter, modelObject)
  }
}

export const itemsDataConverter = {
  fromFirestore(documentData: ItemsDocumentData): Items {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const boundErc721DataConverter = bind(erc721TokenItemDataConverter.fromFirestore, erc721TokenItemDataConverter)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const boundErc1155DataConverter = bind(erc1155TokenItemDataConverter.fromFirestore, erc1155TokenItemDataConverter)
    return pipe<[ItemsDocumentData], Omit<Items, 'erc1155'> & Pick<ItemsDocumentData, 'erc1155'>, Items>(
      modify('erc721', map(boundErc721DataConverter)),
      modify('erc1155', map(boundErc1155DataConverter))
    )(documentData)
  },
  toFirestore(modelObject: WithFieldValue<Items> | FieldValue): ItemsDocumentData {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const boundErc721DataConverter = bind(erc721TokenItemDataConverter.toFirestore, erc721TokenItemDataConverter)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const boundErc1155DataConverter = bind(erc1155TokenItemDataConverter.toFirestore, erc1155TokenItemDataConverter)
    return pipe<[Items], Omit<ItemsDocumentData, 'erc1155'> & Pick<Items, 'erc1155'>, ItemsDocumentData>(
      modify('erc721', map(boundErc721DataConverter)),
      modify('erc1155', map(boundErc1155DataConverter))
    )(modelObject as Items)
  }
}
