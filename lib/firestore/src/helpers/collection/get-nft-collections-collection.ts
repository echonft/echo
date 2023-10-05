import { CollectionName } from '@echo/firestore/constants/collection-name'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { FirestoreNftCollection } from '@echo/firestore/types/model/nft-collection/firestore-nft-collection'
import type { CollectionReference } from 'firebase-admin/lib/firestore'

export function getNftCollectionsCollection() {
  return firestoreApp().collection(CollectionName.NFT_COLLECTIONS) as CollectionReference<FirestoreNftCollection>
}
