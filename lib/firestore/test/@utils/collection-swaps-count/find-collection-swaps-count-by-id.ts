import { type CollectionSwapsCount } from '@echo/firestore/types/model/collection-swaps-count/collection-swaps-count'
import { getCollectionSwapsCountSnapshotById } from '@echo/firestore-test/collection-swaps-count/get-collection-swaps-count-snapshot-by-id'

export async function findCollectionSwapsCountById(id: string): Promise<CollectionSwapsCount | undefined> {
  const querySnapshot = await getCollectionSwapsCountSnapshotById(id)
  return querySnapshot?.data()
}
