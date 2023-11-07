import { assertQueryDocumentSnapshot } from '@echo/firestore/helpers/crud/assert/assert-query-document-snapshot'
import { getOfferUpdateSnapshotById } from '@test-utils/offer-update/get-offer-update-snapshot-by-id'
import { WriteResult } from 'firebase-admin/firestore'

export async function deleteOfferUpdate(id: string): Promise<WriteResult> {
  const documentSnapshot = await getOfferUpdateSnapshotById(id)
  assertQueryDocumentSnapshot(documentSnapshot)
  return documentSnapshot.ref.delete()
}
