import { getOfferSnapshotById } from '@echo/firestore/crud/offer/get-offer-snapshot-by-id'
import { assertQueryDocumentSnapshot } from '@echo/firestore/helpers/crud/assert-query-document-snapshot'
import type { FirestoreOffer } from '@echo/firestore/types/model/offer/firestore-offer'
import type { WriteResult } from 'firebase-admin/lib/firestore'

export async function updateOffer(
  offerId: string,
  updateData: Partial<Omit<FirestoreOffer, 'id'>>
): Promise<WriteResult> {
  const documentSnapshot = await getOfferSnapshotById(offerId)
  assertQueryDocumentSnapshot(documentSnapshot)
  return await documentSnapshot.ref.update(updateData)
}
