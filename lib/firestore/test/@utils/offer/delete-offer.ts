import { getOfferSnapshotById } from '@echo/firestore/crud/offer/get-offer-snapshot-by-id'
import { WriteResult } from 'firebase-admin/firestore'

export async function deleteOffer(id: string): Promise<WriteResult> {
  const documentSnapshot = await getOfferSnapshotById(id)
  // assertQueryDocumentSnapshot(documentSnapshot)
  return documentSnapshot!.ref.delete()
}
