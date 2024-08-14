import { CollectionReferenceName } from '@echo/firestore/constants/collection-reference/collection-reference-name'
import { nftDataConverter } from '@echo/firestore/converters/nft/nft-data-converter'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { NftDocumentData } from '@echo/firestore/types/model/nft/nft-document-data'
import type { Nft } from '@echo/model/types/nft'
import type { CollectionReference } from 'firebase-admin/firestore'

export function getNftsCollectionReference<T extends boolean>(
  withConverter: T
): T extends true ? CollectionReference<Nft, NftDocumentData> : CollectionReference<NftDocumentData, NftDocumentData> {
  if (withConverter) {
    return firestoreApp()
      .collection(CollectionReferenceName.NFTS)
      .withConverter<Nft, NftDocumentData>(nftDataConverter) as T extends true
      ? CollectionReference<Nft, NftDocumentData>
      : CollectionReference<NftDocumentData, NftDocumentData>
  }
  return firestoreApp().collection(CollectionReferenceName.NFTS) as T extends true
    ? CollectionReference<Nft, NftDocumentData>
    : CollectionReference<NftDocumentData, NftDocumentData>
}
