import { CollectionReferenceName } from '@echo/firestore/constants/collection-reference/collection-reference-name'
import { nftDataConverter } from '@echo/firestore/converters/nft/nft-data-converter'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { Nft } from '@echo/model/types/nft'
import type { DocumentReference } from 'firebase-admin/firestore'

export function getNftDocumentReference(id: string): DocumentReference<Nft, Nft> {
  return firestoreApp().collection(CollectionReferenceName.NFTS).withConverter<Nft, Nft>(nftDataConverter).doc(id)
}
