import { getListingOfferSnapshotById } from '@echo/firestore/crud/listing-offer/get-listing-offer-snapshot-by-id'
import { type WriteResult } from 'firebase-admin/lib/firestore'
import { isNil } from 'ramda'

export async function deleteListingOffer(id: string): Promise<WriteResult> {
  const documentSnapshot = await getListingOfferSnapshotById(id)
  if (isNil(documentSnapshot)) {
    throw Error(`listing offer with id ${id} does not exist`)
  }
  return documentSnapshot.ref.delete()
}
