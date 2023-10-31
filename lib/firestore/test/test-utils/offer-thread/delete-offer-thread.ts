import { getOfferThreadSnapshotById } from '@echo/firestore/crud/offer-thread/get-offer-thread-snapshot-by-id'
import { assertQueryDocumentSnapshot } from '@echo/firestore/helpers/crud/assert-query-document-snapshot'
import { type WriteResult } from 'firebase-admin/firestore'

export async function deleteOfferThread(id: string): Promise<WriteResult> {
  const documentSnapshot = await getOfferThreadSnapshotById(id)
  assertQueryDocumentSnapshot(documentSnapshot)
  return documentSnapshot.ref.delete()
}
