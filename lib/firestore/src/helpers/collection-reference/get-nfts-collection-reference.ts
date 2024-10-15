import { CollectionReferenceName } from '@echo/firestore/constants/collection-reference-name'
import { nftDataConverter } from '@echo/firestore/converters/nft-data-converter'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { NftDocumentData } from '@echo/firestore/types/model/nft-document-data'
import type { Nft } from '@echo/model/types/nft'
import type { CollectionReference } from 'firebase-admin/firestore'

export function getNftsCollectionReference(): CollectionReference<Nft, NftDocumentData> {
  return firestoreApp().collection(CollectionReferenceName.Nfts).withConverter<Nft, NftDocumentData>(nftDataConverter)
}
