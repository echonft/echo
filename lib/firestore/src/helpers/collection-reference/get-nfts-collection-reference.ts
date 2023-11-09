import { CollectionReferenceName } from '@echo/firestore/constants/collection-reference/collection-reference-name'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import { type Nft } from '@echo/model/types/nft'
import { CollectionReference } from 'firebase-admin/firestore'

export function getNftsCollectionReference() {
  return firestoreApp().collection(CollectionReferenceName.NFTS) as CollectionReference<Nft>
}
