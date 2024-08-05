import { lowerOwnerWalletAddress } from '@echo/firestore/helpers/converters/nft/lower-owner-wallet-address'
import { getDocumentSnapshotData } from '@echo/firestore/helpers/crud/document/get-document-snapshot-data'
import type { Nft } from '@echo/model/types/nft'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { type FirestoreDataConverter, QueryDocumentSnapshot, type WithFieldValue } from 'firebase-admin/firestore'
import { assoc, complement, has, pipe, when } from 'ramda'

export const nftDataConverter: FirestoreDataConverter<Nft, Nft> = {
  fromFirestore(snapshot: QueryDocumentSnapshot<Nft>): Nft {
    return pipe<[QueryDocumentSnapshot<Nft>], Nft, Nft, Nft>(
      nonNullableReturn(getDocumentSnapshotData<Nft>),
      lowerOwnerWalletAddress<Nft>,
      // add the owner prop if it is not present
      when<Nft, Nft>(complement(has('owner')), assoc('owner', undefined))
    )(snapshot)
  },
  toFirestore(modelObject: WithFieldValue<Nft>): WithFieldValue<Nft> {
    return lowerOwnerWalletAddress(modelObject)
  }
}
