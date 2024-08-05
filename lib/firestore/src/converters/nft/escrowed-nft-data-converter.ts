import { lowerOwnerWalletAddress } from '@echo/firestore/helpers/converters/nft/lower-owner-wallet-address'
import { getDocumentSnapshotData } from '@echo/firestore/helpers/crud/document/get-document-snapshot-data'
import type { EscrowedNft } from '@echo/firestore/types/model/nft/escrowed-nft'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { type FirestoreDataConverter, QueryDocumentSnapshot, type WithFieldValue } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

export const escrowedNftDataConverter: FirestoreDataConverter<EscrowedNft, EscrowedNft> = {
  fromFirestore(snapshot: QueryDocumentSnapshot<EscrowedNft>): EscrowedNft {
    return pipe<[QueryDocumentSnapshot<EscrowedNft>], EscrowedNft, EscrowedNft>(
      nonNullableReturn(getDocumentSnapshotData<EscrowedNft>),
      lowerOwnerWalletAddress
    )(snapshot)
  },
  toFirestore(modelObject: WithFieldValue<EscrowedNft>): WithFieldValue<EscrowedNft> {
    return lowerOwnerWalletAddress(modelObject)
  }
}
