import { CollectionName } from '@echo/firestore/constants/collection-name'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { FirestoreNft } from '@echo/firestore/types/model/nft/firestore-nft'
import type { CollectionReference } from 'firebase-admin/lib/firestore'

export function getNftsCollection() {
  return firestoreApp().collection(CollectionName.NFTS) as CollectionReference<FirestoreNft>
}
