import { getOfferSnapshotById } from '@echo/firestore/crud/offer/get-offer-snapshot-by-id'
import { type Offer } from '@echo/model/types/offer'
import { WriteResult } from 'firebase-admin/firestore'

export async function unchecked_updateOffer(
  offerId: string,
  updateData: Partial<Omit<Offer, 'id'>>
): Promise<WriteResult> {
  const documentSnapshot = await getOfferSnapshotById(offerId)
  // assertQueryDocumentSnapshot(documentSnapshot)
  return await documentSnapshot!.ref.update(updateData)
}
