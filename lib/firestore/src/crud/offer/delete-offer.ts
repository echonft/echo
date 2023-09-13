import { getOfferSnapshotById } from '@echo/firestore/crud/offer/get-offer-snapshot-by-id'
import type { WriteResult } from 'firebase-admin/firestore'
import { isNil } from 'ramda'

export async function deleteOffer(id: string): Promise<WriteResult> {
  const documentSnapshot = await getOfferSnapshotById(id)
  if (isNil(documentSnapshot)) {
    throw Error('invalid offer id')
  }
  return documentSnapshot.ref.delete()
}
