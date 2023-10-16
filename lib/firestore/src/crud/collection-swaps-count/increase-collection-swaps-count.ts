import { findCollectionById } from '@echo/firestore/crud/collection/find-collection-by-id'
import { getCollectionSwapsCountSnapshotByCollectionId } from '@echo/firestore/crud/collection-swaps-count/get-collection-swaps-count-snapshot-by-collection-id'
import { getCollectionSwapsCountCollectionReference } from '@echo/firestore/helpers/collection-reference/get-collection-swaps-count-collection-reference'
import type { CollectionSwapsCount } from '@echo/firestore/types/model/collection-swaps-count/collection-swaps-count'
import { isNil, mergeLeft } from 'ramda'

export async function increaseCollectionSwapsCount(collectionId: string): Promise<CollectionSwapsCount> {
  const collection = await findCollectionById(collectionId)
  if (isNil(collection)) {
    throw Error(
      `trying to increase swaps count for nft collection with id ${collectionId} but this collection does not exist`
    )
  }
  const snapshot = await getCollectionSwapsCountSnapshotByCollectionId(collectionId)
  if (isNil(snapshot) || isNil(snapshot.data()) || !snapshot.exists) {
    const reference = getCollectionSwapsCountCollectionReference().doc()
    const id = reference.id
    const newSwapsCount: CollectionSwapsCount = { id, collectionId, swapsCount: 1 }
    await reference.set(newSwapsCount)
    return newSwapsCount
  }
  const existingSwapsCount = snapshot.data()
  const increasedCount = { swapsCount: existingSwapsCount.swapsCount + 1 }
  await snapshot.ref.update(increasedCount)
  return mergeLeft(increasedCount, existingSwapsCount)
}
