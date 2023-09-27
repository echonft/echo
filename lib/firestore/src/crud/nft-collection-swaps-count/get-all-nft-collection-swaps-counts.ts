import { CollectionName } from '@echo/firestore/constants/collection-name'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { FirestoreNftCollectionSwapsCount } from '@echo/firestore/types/model/nft-collection-swaps-count/firestore-nft-collection-swaps-count'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { invoker, map } from 'ramda'

export async function getAllNftCollectionSwapsCounts() {
  const querySnapshot = await firestoreApp().collection(CollectionName.NFT_COLLECTION_SWAPS_COUNT).get()

  if (querySnapshot.empty || isNilOrEmpty(querySnapshot.docs)) {
    return [] as FirestoreNftCollectionSwapsCount[]
  }

  return map(invoker(0, 'data'), querySnapshot.docs) as FirestoreNftCollectionSwapsCount[]
}
