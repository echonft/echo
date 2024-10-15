import { CollectionReferenceName } from '@echo/firestore/constants/collection-reference-name'
import { escrowedNftDataConverter } from '@echo/firestore/converters/nft/escrowed-nft-data-converter'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { EscrowedNftDocumentData } from '@echo/firestore/types/model/nft/escrowed-nft-document-data'
import type { CollectionReference } from 'firebase-admin/firestore'

export function getEscrowedNftsCollectionReference(): CollectionReference<
  EscrowedNftDocumentData,
  EscrowedNftDocumentData
> {
  return firestoreApp()
    .collection(CollectionReferenceName.EscrowedNfts)
    .withConverter<EscrowedNftDocumentData, EscrowedNftDocumentData>(escrowedNftDataConverter)
}
