import { getNftTokenIdLabel } from '@echo/firestore/helpers/converters/nft/get-nft-token-id-label'
import { lowerOwnerWalletAddressIfExists } from '@echo/firestore/helpers/converters/nft/lower-owner-wallet-address-if-exists'
import { getDocumentSnapshotData } from '@echo/firestore/helpers/crud/document/get-document-snapshot-data'
import type { NftDocumentData } from '@echo/firestore/types/model/nft-document-data'
import type { Nft } from '@echo/model/types/nft/nft'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { type FirestoreDataConverter, QueryDocumentSnapshot, type WithFieldValue } from 'firebase-admin/firestore'
import { assoc, dissoc, has, pipe, unless } from 'ramda'

export const nftDataConverter: FirestoreDataConverter<Nft, NftDocumentData> &
  Record<'fromDocumentData', (data: NftDocumentData) => Nft> = {
  fromDocumentData(data: NftDocumentData): Nft {
    return pipe<[NftDocumentData], Omit<Nft, 'tokenIdLabel'>, Nft>(
      // add the owner prop if it is not present
      unless<NftDocumentData, NftDocumentData>(has('owner'), assoc('owner', undefined)),
      // set the token id label
      assoc('tokenIdLabel', getNftTokenIdLabel(data))
    )(data)
  },
  fromFirestore(snapshot: QueryDocumentSnapshot<NftDocumentData, NftDocumentData>): Nft {
    return pipe(
      nonNullableReturn(getDocumentSnapshotData<NftDocumentData, NftDocumentData>),
      this.fromDocumentData
    )(snapshot)
  },
  toFirestore(modelObject: WithFieldValue<Nft>): WithFieldValue<NftDocumentData> {
    return pipe(lowerOwnerWalletAddressIfExists, dissoc('tokenIdLabel'))(modelObject)
  }
}
