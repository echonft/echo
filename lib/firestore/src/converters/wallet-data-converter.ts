import { lowerAddressIfExists } from '@echo/firestore/helpers/converters/wallet/to-firestore/lower-address-if-exists'
import type { WalletDocumentData } from '@echo/firestore/types/model/wallet-document-data'
import { type FirestoreDataConverter, QueryDocumentSnapshot, type WithFieldValue } from 'firebase-admin/firestore'

export const walletDataConverter: FirestoreDataConverter<WalletDocumentData, WalletDocumentData> = {
  fromFirestore(snapshot: QueryDocumentSnapshot<WalletDocumentData, WalletDocumentData>): WalletDocumentData {
    return snapshot.data()
  },
  toFirestore(modelObject: WithFieldValue<WalletDocumentData>): WithFieldValue<WalletDocumentData> {
    return lowerAddressIfExists(modelObject)
  }
}
