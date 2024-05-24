import { lowerOwnerWalletAddress } from '@echo/firestore/helpers/converters/nft/lower-owner-wallet-address'
import { lowerOwnerWalletAddressIfExists } from '@echo/firestore/helpers/converters/nft/to-firestore/lower-owner-wallet-address-if-exists'
import { getDocumentSnapshotData } from '@echo/firestore/helpers/crud/document/get-document-snapshot-data'
import type { Nft } from '@echo/model/types/nft'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { type FirestoreDataConverter, QueryDocumentSnapshot, type WithFieldValue } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

export const nftDataConverter: FirestoreDataConverter<Nft, Nft> = {
  fromFirestore(snapshot: QueryDocumentSnapshot<Nft>): Nft {
    return pipe<[QueryDocumentSnapshot<Nft>], Nft, Nft>(
      nonNullableReturn(getDocumentSnapshotData<Nft>),
      lowerOwnerWalletAddress
    )(snapshot)
  },
  toFirestore(modelObject: WithFieldValue<Nft>): WithFieldValue<Nft> {
    return lowerOwnerWalletAddressIfExists(modelObject)
  }
}
