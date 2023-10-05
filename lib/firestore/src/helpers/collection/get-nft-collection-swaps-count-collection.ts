import { CollectionName } from '@echo/firestore/constants/collection-name'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { FirestoreNftCollectionSwapsCount } from '@echo/firestore/types/model/nft-collection-swaps-count/firestore-nft-collection-swaps-count'
import type { CollectionReference } from 'firebase-admin/lib/firestore'

export function getNftCollectionSwapsCountCollection() {
  return firestoreApp().collection(
    CollectionName.NFT_COLLECTION_SWAPS_COUNT
  ) as CollectionReference<FirestoreNftCollectionSwapsCount>
}
