import { getOfferSnapshotById } from '@echo/firestore/crud/offer/get-offer-snapshot-by-id'
import { assertQueryDocumentSnapshot } from '@echo/firestore/helpers/crud/assert-query-document-snapshot'
import type { WriteResult } from 'firebase-admin/lib/firestore'

export async function deleteOffer(id: string): Promise<WriteResult> {
  const documentSnapshot = await getOfferSnapshotById(id)
  assertQueryDocumentSnapshot(documentSnapshot)
  return documentSnapshot.ref.delete()
}
