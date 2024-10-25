import { addReceiverItemsCollectionSlug } from '@echo/firestore/helpers/converters/swap/to-firestore/add-receiver-items-collection-slug'
import { addReceiverItemsIndex } from '@echo/firestore/helpers/converters/swap/to-firestore/add-receiver-items-index'
import { addSenderItemsCollectionSlug } from '@echo/firestore/helpers/converters/swap/to-firestore/add-sender-items-collection-slug'
import { addSenderItemsIndex } from '@echo/firestore/helpers/converters/swap/to-firestore/add-sender-items-index'
import { lowerReceiverWalletAddressIfExists } from '@echo/firestore/helpers/converters/swap/to-firestore/lower-receiver-wallet-address-if-exists'
import { lowerSenderWalletAddressIfExists } from '@echo/firestore/helpers/converters/swap/to-firestore/lower-sender-wallet-address-if-exists'
import type { SwapDocumentData } from '@echo/firestore/types/model/swap-document-data'
import type { Swap } from '@echo/model/types/swap'
import { propIsNil } from '@echo/utils/fp/prop-is-nil'
import { QueryDocumentSnapshot, type WithFieldValue } from 'firebase-admin/firestore'
import { dissoc, invoker, pipe, unless } from 'ramda'

export const swapDataConverter = {
  fromFirestore(snapshot: QueryDocumentSnapshot<SwapDocumentData, SwapDocumentData>): Swap {
    return pipe(
      invoker(0, 'data'),
      dissoc('receiverItemIndexes'),
      dissoc('receiverItemCollections'),
      dissoc('senderItemIndexes'),
      dissoc('senderItemCollections'),
      dissoc('offerId')
    )(snapshot) as Swap
  },
  toFirestore(modelObject: WithFieldValue<Swap>): WithFieldValue<SwapDocumentData> {
    return pipe(
      lowerReceiverWalletAddressIfExists,
      lowerSenderWalletAddressIfExists,
      unless(propIsNil('receiverItems'), pipe(addReceiverItemsIndex, addReceiverItemsCollectionSlug)),
      unless(propIsNil('senderItems'), pipe(addSenderItemsIndex, addSenderItemsCollectionSlug))
    )(modelObject as Partial<Swap>) as WithFieldValue<SwapDocumentData>
  }
}
