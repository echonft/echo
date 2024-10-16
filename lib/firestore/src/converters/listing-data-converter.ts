import { erc1155ItemDataConverter } from '@echo/firestore/converters/erc1155-item-data-converter'
import { erc721ItemDataConverter } from '@echo/firestore/converters/erc721-item-data-converter'
import { setReadOnly } from '@echo/firestore/helpers/converters/listing/from-firestore/set-read-only'
import { lowerCreatorWalletAddress } from '@echo/firestore/helpers/converters/listing/lower-creator-wallet-address'
import { normalizeSlug } from '@echo/firestore/helpers/converters/listing/normalize-slug'
import { addListingItemsCollectionSlug } from '@echo/firestore/helpers/converters/listing/to-firestore/add-listing-items-collection-slug'
import { addListingItemsIndex } from '@echo/firestore/helpers/converters/listing/to-firestore/add-listing-items-index'
import { lowerCreatorWalletAddressIfExists } from '@echo/firestore/helpers/converters/listing/to-firestore/lower-creator-wallet-address-if-exists'
import { normalizeSlugIfExists } from '@echo/firestore/helpers/converters/listing/to-firestore/normalize-slug-if-exists'
import { getDocumentSnapshotData } from '@echo/firestore/helpers/crud/document/get-document-snapshot-data'
import type { Erc1155ItemDocumentData } from '@echo/firestore/types/model/erc1155-item-document-data'
import type { Erc721ItemDocumentData } from '@echo/firestore/types/model/erc721-token-document-data'
import { type ListingDocumentData } from '@echo/firestore/types/model/listing-document-data'
import { isErc721Item } from '@echo/model/helpers/item/is-erc721-item'
import { isErc721Token } from '@echo/model/helpers/token/is-erc721-token'
import type { Erc1155Item } from '@echo/model/types/item/erc1155-item'
import type { Erc721Item } from '@echo/model/types/item/erc721-item'
import { type Listing } from '@echo/model/types/listing/listing'
import { nonEmptyArrayMap } from '@echo/utils/fp/non-empty-array-map'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { propIsNil } from '@echo/utils/fp/prop-is-nil'
import {
  FieldValue,
  type FirestoreDataConverter,
  QueryDocumentSnapshot,
  type WithFieldValue
} from 'firebase-admin/firestore'
import { bind, dissoc, modify, pipe, prop, unless } from 'ramda'

function isErc721ItemDocumentData(
  item: Erc721ItemDocumentData | Erc1155ItemDocumentData
): item is Erc721ItemDocumentData {
  return pipe(prop('token'), isErc721Token)(item)
}

const itemsDataConverter = {
  fromFirestore(documentData: ListingDocumentData['items']): Listing['items'] {
    function mapItem<T extends Erc721ItemDocumentData | Erc1155ItemDocumentData>(
      item: T
    ): T extends Erc721ItemDocumentData ? Erc721Item : Erc1155Item {
      if (isErc721ItemDocumentData(item)) {
        return erc721ItemDataConverter.fromFirestore(item) as T extends Erc721ItemDocumentData
          ? Erc721Item
          : Erc1155Item
      }
      return erc1155ItemDataConverter.fromFirestore(item) as T extends Erc721ItemDocumentData ? Erc721Item : Erc1155Item
    }

    return nonEmptyArrayMap(mapItem, documentData)
  },
  toFirestore(modelObject: WithFieldValue<Listing['items']> | FieldValue): ListingDocumentData['items'] {
    function mapItem<T extends Erc721Item | Erc1155Item>(
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
    return nonEmptyArrayMap(mapItem, modelObject as Listing['items'])
  }
}

export const listingDataConverter: FirestoreDataConverter<Listing, ListingDocumentData> = {
  fromFirestore(snapshot: QueryDocumentSnapshot<ListingDocumentData, ListingDocumentData>): Listing {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const boundDataConverter = bind(itemsDataConverter.fromFirestore, itemsDataConverter)
    return pipe<
      [QueryDocumentSnapshot<ListingDocumentData, ListingDocumentData>],
      ListingDocumentData,
      ListingDocumentData,
      Omit<ListingDocumentData, 'itemIndexes'>,
      Omit<ListingDocumentData, 'itemIndexes' | 'itemCollections'>,
      Omit<Listing, 'readOnly'>,
      Listing,
      Listing
    >(
      nonNullableReturn(getDocumentSnapshotData),
      lowerCreatorWalletAddress,
      dissoc('itemIndexes'),
      dissoc('itemCollections'),
      modify('items', boundDataConverter),
      setReadOnly,
      normalizeSlug
    )(snapshot)
  },
  toFirestore(modelObject: WithFieldValue<Listing>): WithFieldValue<ListingDocumentData> {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const boundDataConverter = bind(itemsDataConverter.toFirestore, itemsDataConverter)
    return pipe<
      [WithFieldValue<Listing>],
      WithFieldValue<Listing>,
      WithFieldValue<Omit<Listing, 'items'> & Pick<ListingDocumentData, 'items'>>,
      WithFieldValue<Omit<ListingDocumentData, 'itemIndexes' | 'itemCollections'>>,
      WithFieldValue<Omit<ListingDocumentData, 'itemCollections'>>,
      WithFieldValue<ListingDocumentData>,
      WithFieldValue<ListingDocumentData>
    >(
      lowerCreatorWalletAddressIfExists,
      unless(propIsNil('items'), modify('items', boundDataConverter)),
      dissoc('readOnly'),
      addListingItemsIndex,
      addListingItemsCollectionSlug,
      normalizeSlugIfExists
    )(modelObject)
  }
}
