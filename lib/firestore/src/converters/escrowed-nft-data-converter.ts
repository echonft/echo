import { lowerOwnerWalletAddressIfExists } from '@echo/firestore/helpers/converters/nft/lower-owner-wallet-address-if-exists'
import type { EscrowedNftDocumentData } from '@echo/firestore/types/model/escrowed-nft-document-data'
import { QueryDocumentSnapshot, type WithFieldValue } from 'firebase-admin/firestore'

export const escrowedNftDataConverter = {
  fromFirestore(
    snapshot: QueryDocumentSnapshot<EscrowedNftDocumentData, EscrowedNftDocumentData>
  ): EscrowedNftDocumentData {
    return snapshot.data()
  },
  toFirestore(modelObject: WithFieldValue<EscrowedNftDocumentData>): WithFieldValue<EscrowedNftDocumentData> {
    return lowerOwnerWalletAddressIfExists(modelObject)
  }
}
