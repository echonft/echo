import { getCollectionSwapsCountSnapshotByCollectionId } from '@echo/firestore/crud/collection-swaps-count/get-collection-swaps-count-snapshot-by-collection-id'
import type { CollectionSwapsCount } from '@echo/firestore/types/model/collection-swaps-count/collection-swaps-count'

export async function findCollectionSwapsCountByCollectionId(
  collectionId: string
): Promise<CollectionSwapsCount | undefined> {
  const querySnapshot = await getCollectionSwapsCountSnapshotByCollectionId(collectionId)
  return querySnapshot?.data()
}
