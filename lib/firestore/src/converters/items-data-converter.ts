import { erc1155ItemDataConverter } from '@echo/firestore/converters/erc1155-item-data-converter'
import { erc721ItemDataConverter } from '@echo/firestore/converters/erc721-item-data-converter'
import type { Erc1155ItemDocumentData } from '@echo/firestore/types/model/erc1155-item-document-data'
import type { Erc721ItemDocumentData } from '@echo/firestore/types/model/erc721-token-document-data'
import { isErc721Item } from '@echo/model/helpers/item/is-erc721-item'
import { itemToken } from '@echo/model/helpers/item/item-token'
import { isErc721Token } from '@echo/model/helpers/token/is-erc721-token'
import type { Erc1155Item } from '@echo/model/types/item/erc1155-item'
import type { Erc721Item } from '@echo/model/types/item/erc721-item'
import type { NftItem } from '@echo/model/types/item/nft-item'
import { nonEmptyMap } from '@echo/utils/fp/non-empty-map'
import { FieldValue, type WithFieldValue } from 'firebase-admin/firestore'
import { type NonEmptyArray, pipe } from 'ramda'

type ItemDocumentData = Erc721ItemDocumentData | Erc1155ItemDocumentData
type Items = NonEmptyArray<NftItem>
type ItemsDocumentData = NonEmptyArray<Erc721ItemDocumentData | Erc1155ItemDocumentData>

function isErc721ItemDocumentData(item: ItemDocumentData): item is Erc721ItemDocumentData {
  return pipe(itemToken, isErc721Token)(item)
}
export const itemsDataConverter = {
  fromFirestore(documentData: ItemsDocumentData): Items {
    function mapItem<T extends ItemDocumentData>(item: T): T extends Erc721ItemDocumentData ? Erc721Item : Erc1155Item {
      if (isErc721ItemDocumentData(item)) {
        return erc721ItemDataConverter.fromFirestore(item) as T extends Erc721ItemDocumentData
          ? Erc721Item
          : Erc1155Item
      }
      return erc1155ItemDataConverter.fromFirestore(item) as T extends Erc721ItemDocumentData ? Erc721Item : Erc1155Item
    }

    return nonEmptyMap(mapItem, documentData)
  },
  toFirestore(modelObject: WithFieldValue<Items> | FieldValue): ItemsDocumentData {
    function mapItem<T extends NftItem>(
      item: T
    ): T extends Erc721Item ? Erc721ItemDocumentData : Erc1155ItemDocumentData {
      if (isErc721Item(item)) {
        return erc721ItemDataConverter.toFirestore(item) as T extends Erc721Item
          ? Erc721ItemDocumentData
          : Erc1155ItemDocumentData
      }
      return erc1155ItemDataConverter.toFirestore(item) as T extends Erc721Item
        ? Erc721ItemDocumentData
        : Erc1155ItemDocumentData
    }
    return nonEmptyMap(mapItem, modelObject as Items)
  }
}
