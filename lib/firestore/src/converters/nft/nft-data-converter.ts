import { getSnapshotData } from '@echo/firestore/helpers/converters/get-snapshot-data'
import { lowerCollectionAddress } from '@echo/firestore/helpers/converters/nft/lower-collection-address'
import { lowerOwnerWalletAddress } from '@echo/firestore/helpers/converters/nft/lower-owner-wallet-address'
import { lowerCollectionAddressIfExists } from '@echo/firestore/helpers/converters/nft/to-firestore/lower-collection-address-if-exists'
import { lowerOwnerWalletAddressIfExists } from '@echo/firestore/helpers/converters/nft/to-firestore/lower-owner-wallet-address-if-exists'
import type { Nft } from '@echo/model/types/nft'
import { type FirestoreDataConverter, QueryDocumentSnapshot, type WithFieldValue } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

export const nftDataConverter: FirestoreDataConverter<Nft> = {
  fromFirestore(snapshot: QueryDocumentSnapshot<Nft>): Nft {
    return pipe<[QueryDocumentSnapshot<Nft, Nft>], Nft, Nft, Nft>(
      getSnapshotData<Nft, Nft>,
      lowerCollectionAddress,
      lowerOwnerWalletAddress
    )(snapshot)
  },
  toFirestore(modelObject: WithFieldValue<Nft>): WithFieldValue<Nft> {
    return pipe(lowerCollectionAddressIfExists, lowerOwnerWalletAddressIfExists)(modelObject)
  }
}
