import { getOfferPostSnapshotById } from '@echo/firestore/crud/offer-post/get-offer-post-snapshot-by-id'
import { assertQueryDocumentSnapshot } from '@echo/firestore/helpers/crud/assert-query-document-snapshot'
import type { WriteResult } from 'firebase-admin/lib/firestore'

export async function deleteOfferPost(id: string): Promise<WriteResult> {
  const documentSnapshot = await getOfferPostSnapshotById(id)
  assertQueryDocumentSnapshot(documentSnapshot)
  return documentSnapshot.ref.delete()
}
