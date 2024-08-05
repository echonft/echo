import { CollectionReferenceName } from '@echo/firestore/constants/collection-reference/collection-reference-name'
import { escrowedNftDataConverter } from '@echo/firestore/converters/nft/escrowed-nft-data-converter'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { EscrowedNft } from '@echo/firestore/types/model/nft/escrowed-nft'
import type { CollectionReference } from 'firebase-admin/firestore'

export function getEscrowedNftsCollectionReference(): CollectionReference<EscrowedNft, EscrowedNft> {
  return firestoreApp()
    .collection(CollectionReferenceName.ESCROWED_NFTS)
    .withConverter<EscrowedNft, EscrowedNft>(escrowedNftDataConverter)
}
