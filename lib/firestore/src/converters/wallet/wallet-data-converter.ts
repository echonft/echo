import { lowerAddress } from '@echo/firestore/helpers/converters/wallet/lower-address'
import { lowerAddressIfExists } from '@echo/firestore/helpers/converters/wallet/to-firestore/lower-address-if-exists'
import { getDocumentSnapshotData } from '@echo/firestore/helpers/crud/document/get-document-snapshot-data'
import type { WalletDocumentData } from '@echo/firestore/types/model/wallet/wallet-document-data'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { type FirestoreDataConverter, QueryDocumentSnapshot, type WithFieldValue } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

export const walletDataConverter: FirestoreDataConverter<WalletDocumentData, WalletDocumentData> = {
  fromFirestore(snapshot: QueryDocumentSnapshot<WalletDocumentData>): WalletDocumentData {
    return pipe<[QueryDocumentSnapshot<WalletDocumentData>], WalletDocumentData, WalletDocumentData>(
      nonNullableReturn(getDocumentSnapshotData<WalletDocumentData>),
      lowerAddress
    )(snapshot)
  },
  toFirestore(modelObject: WithFieldValue<WalletDocumentData>): WithFieldValue<WalletDocumentData> {
    return lowerAddressIfExists(modelObject)
  }
}
