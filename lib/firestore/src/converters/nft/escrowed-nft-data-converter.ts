import { lowerOwnerWalletAddress } from '@echo/firestore/helpers/converters/nft/lower-owner-wallet-address'
import { getDocumentSnapshotData } from '@echo/firestore/helpers/crud/document/get-document-snapshot-data'
import type { EscrowedNftDocumentData } from '@echo/firestore/types/model/nft/escrowed-nft-document-data'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { type FirestoreDataConverter, QueryDocumentSnapshot, type WithFieldValue } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

export const escrowedNftDataConverter: FirestoreDataConverter<EscrowedNftDocumentData, EscrowedNftDocumentData> = {
  fromFirestore(
    snapshot: QueryDocumentSnapshot<EscrowedNftDocumentData, EscrowedNftDocumentData>
  ): EscrowedNftDocumentData {
    return pipe<
      [QueryDocumentSnapshot<EscrowedNftDocumentData, EscrowedNftDocumentData>],
      EscrowedNftDocumentData,
      EscrowedNftDocumentData
    >(
      nonNullableReturn(getDocumentSnapshotData),
      lowerOwnerWalletAddress
    )(snapshot)
  },
  toFirestore(modelObject: WithFieldValue<EscrowedNftDocumentData>): WithFieldValue<EscrowedNftDocumentData> {
    return lowerOwnerWalletAddress(modelObject)
  }
}
