import { assertQueryDocumentSnapshot } from '@echo/firestore/helpers/crud/assert-query-document-snapshot'
import { type CollectionSwapsCount } from '@echo/firestore/types/model/collection-swaps-count/collection-swaps-count'
import { getCollectionSwapsCountSnapshotById } from '@test-utils/collection-swaps-count/get-collection-swaps-count-snapshot-by-id'
import { type WriteResult } from 'firebase-admin/lib/firestore'

export async function uncheckedUpdateCollectionSwapCounts(
  collectionSwapsCountId: string,
  updateData: Partial<Omit<CollectionSwapsCount, 'id'>>
): Promise<WriteResult> {
  const documentSnapshot = await getCollectionSwapsCountSnapshotById(collectionSwapsCountId)
  assertQueryDocumentSnapshot(documentSnapshot)
  return await documentSnapshot.ref.update(updateData)
}
