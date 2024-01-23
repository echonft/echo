import { getSnapshotData } from '@echo/firestore/helpers/converters/get-snapshot-data'
import { lowerAddress } from '@echo/firestore/helpers/converters/wallet/lower-address'
import { lowerAddressIfExists } from '@echo/firestore/helpers/converters/wallet/to-firestore/lower-address-if-exists'
import type { WalletDocumentData } from '@echo/firestore/types/model/wallet/wallet-document-data'
import { type FirestoreDataConverter, QueryDocumentSnapshot, type WithFieldValue } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

export const walletDataConverter: FirestoreDataConverter<WalletDocumentData> = {
  fromFirestore(snapshot: QueryDocumentSnapshot<WalletDocumentData>) {
    return pipe<[QueryDocumentSnapshot<WalletDocumentData>], WalletDocumentData, WalletDocumentData>(
      getSnapshotData<WalletDocumentData>,
      lowerAddress
    )(snapshot)
  },
  toFirestore(modelObject: WithFieldValue<WalletDocumentData>) {
    return lowerAddressIfExists(modelObject)
  }
}
