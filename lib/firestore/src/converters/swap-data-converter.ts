import { itemsDataConverter } from '@echo/firestore/converters/items-data-converter'
import { addReceiverItemsCollectionSlug } from '@echo/firestore/helpers/converters/swap/to-firestore/add-receiver-items-collection-slug'
import { addReceiverItemsIndex } from '@echo/firestore/helpers/converters/swap/to-firestore/add-receiver-items-index'
import { addSenderItemsCollectionSlug } from '@echo/firestore/helpers/converters/swap/to-firestore/add-sender-items-collection-slug'
import { addSenderItemsIndex } from '@echo/firestore/helpers/converters/swap/to-firestore/add-sender-items-index'
import { lowerReceiverWalletAddressIfExists } from '@echo/firestore/helpers/converters/swap/to-firestore/lower-receiver-wallet-address-if-exists'
import { lowerSenderWalletAddressIfExists } from '@echo/firestore/helpers/converters/swap/to-firestore/lower-sender-wallet-address-if-exists'
import { getDocumentSnapshotData } from '@echo/firestore/helpers/crud/document/get-document-snapshot-data'
import type { SwapDocumentData } from '@echo/firestore/types/model/swap-document-data'
import type { Swap } from '@echo/model/types/swap/swap'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { propIsNil } from '@echo/utils/fp/prop-is-nil'
import { QueryDocumentSnapshot, type WithFieldValue } from 'firebase-admin/firestore'
import { dissoc, modify, pipe, unless } from 'ramda'

export const swapDataConverter = {
  fromFirestore(snapshot: QueryDocumentSnapshot<SwapDocumentData, SwapDocumentData>): Swap {
    return pipe(
      nonNullableReturn(getDocumentSnapshotData<SwapDocumentData, SwapDocumentData>),
      dissoc('receiverItemIndexes'),
      dissoc('receiverItemCollections'),
      dissoc('senderItemIndexes'),
      dissoc('senderItemCollections'),
      dissoc('offerId'),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      modify('receiverItems', (obj) => itemsDataConverter.fromFirestore(obj)),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      modify('senderItems', (obj) => itemsDataConverter.fromFirestore(obj))
    )(snapshot) as Swap
  },
  toFirestore(modelObject: WithFieldValue<Swap>): WithFieldValue<SwapDocumentData> {
    return pipe(
      lowerReceiverWalletAddressIfExists,
      lowerSenderWalletAddressIfExists,
      unless(
        propIsNil('receiverItems'),
        pipe(
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          modify('receiverItems', (obj) => itemsDataConverter.toFirestore(obj)),
          addReceiverItemsIndex,
          addReceiverItemsCollectionSlug
        )
      ),
      unless(
        propIsNil('senderItems'),
        pipe(
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          modify('senderItems', (obj) => itemsDataConverter.toFirestore(obj)),
          addSenderItemsIndex,
          addSenderItemsCollectionSlug
        )
      )
    )(modelObject as Partial<Swap>) as WithFieldValue<SwapDocumentData>
  }
}
