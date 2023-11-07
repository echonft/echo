import { getCollectionSnapshotById } from '@echo/firestore/crud/collection/get-collection-snapshot-by-id'
import { assertQueryDocumentSnapshot } from '@echo/firestore/helpers/crud/assert/assert-query-document-snapshot'
import { type Collection } from '@echo/model/types/collection'
import { WriteResult } from 'firebase-admin/firestore'

export async function unchecked_updateCollection(
  collectionId: string,
  updateData: Partial<Omit<Collection, 'id'>>
): Promise<WriteResult> {
  const documentSnapshot = await getCollectionSnapshotById(collectionId)
  assertQueryDocumentSnapshot(documentSnapshot)
  return await documentSnapshot.ref.update(updateData)
}
