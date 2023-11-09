import { getOfferUpdateSnapshotById } from '@echo/firestore/crud/offer-update/get-offer-update-snapshot-by-id'
import { assertQueryDocumentSnapshot } from '@echo/firestore/helpers/crud/assert/assert-query-document-snapshot'
import { WriteResult } from 'firebase-admin/firestore'

export async function deleteOfferUpdate(id: string): Promise<WriteResult> {
  const documentSnapshot = await getOfferUpdateSnapshotById(id)
  assertQueryDocumentSnapshot(documentSnapshot)
  return documentSnapshot.ref.delete()
}
