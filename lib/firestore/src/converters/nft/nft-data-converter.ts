import { lowerOwnerWalletAddress } from '@echo/firestore/helpers/converters/nft/lower-owner-wallet-address'
import { getDocumentSnapshotData } from '@echo/firestore/helpers/crud/document/get-document-snapshot-data'
import type { NftDocumentData } from '@echo/firestore/types/model/nft/nft-document-data'
import type { Collection } from '@echo/model/types/collection'
import type { Nft, NftCollection } from '@echo/model/types/nft'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { type FirestoreDataConverter, QueryDocumentSnapshot, type WithFieldValue } from 'firebase-admin/firestore'
import { assoc, has, modify, pick, pipe, unless } from 'ramda'

export const nftDataConverter: FirestoreDataConverter<Nft, NftDocumentData> &
  Record<'fromDocumentData', (data: NftDocumentData) => Nft> = {
  fromDocumentData(data: NftDocumentData): Nft {
    const label = `#${data.tokenId.toString().padStart(Math.ceil(Math.log10(data.collection.totalSupply)), '0')}`
    return pipe<
      [NftDocumentData],
      NftDocumentData,
      NftDocumentData,
      NftDocumentData & Record<'tokenIdLabel', string>,
      Nft
    >(
      // lower the owner wallet address (in case it wasn't)
      lowerOwnerWalletAddress,
      // add the owner prop if it is not present
      unless<NftDocumentData, NftDocumentData>(has('owner'), assoc('owner', undefined)),
      // set the token id label
      assoc('tokenIdLabel', label),
      // pick the needed props from collection
      modify<'collection', Collection, NftCollection>('collection', pick(['contract', 'name', 'slug']))
    )(data)
  },
  fromFirestore(snapshot: QueryDocumentSnapshot<NftDocumentData>): Nft {
    return pipe(nonNullableReturn(getDocumentSnapshotData<NftDocumentData>), this.fromDocumentData)(snapshot)
  },
  toFirestore(_modelObject: WithFieldValue<Nft>): WithFieldValue<NftDocumentData> {
    throw Error('NFT conversion to Firestore is not supported')
  }
}
