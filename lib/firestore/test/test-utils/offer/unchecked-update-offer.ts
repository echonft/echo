import { getOfferSnapshotById } from '@echo/firestore/crud/offer/get-offer-snapshot-by-id'
import { assertQueryDocumentSnapshot } from '@echo/firestore/helpers/crud/assert-query-document-snapshot'
import { type Offer } from '@echo/model/types/offer'
import { type WriteResult } from 'firebase-admin/firestore'

export async function uncheckedUpdateOffer(
  offerId: string,
  updateData: Partial<Omit<Offer, 'id'>>
): Promise<WriteResult> {
  const documentSnapshot = await getOfferSnapshotById(offerId)
  assertQueryDocumentSnapshot(documentSnapshot)
  return await documentSnapshot.ref.update(updateData)
}
