import { CollectionReferenceName } from '@echo/firestore/constants/collection-reference/collection-reference-name'
import { nftDataConverter } from '@echo/firestore/converters/nft/nft-data-converter'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { Nft } from '@echo/model/types/nft'
import type { CollectionReference } from 'firebase-admin/firestore'

export function getEscrowedNftsCollectionReference(): CollectionReference<Nft, Nft> {
  return firestoreApp().collection(CollectionReferenceName.ESCROWED_NFTS).withConverter<Nft, Nft>(nftDataConverter)
}
