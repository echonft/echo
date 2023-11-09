import { getListingOfferSnapshotById } from '@echo/firestore-test/listing-offer/get-listing-offer-snapshot-by-id'
import { WriteResult } from 'firebase-admin/firestore'
import { isNil } from 'ramda'

export async function deleteListingOffer(id: string): Promise<WriteResult> {
  const documentSnapshot = await getListingOfferSnapshotById(id)
  if (isNil(documentSnapshot)) {
    throw Error(`listing offer with id ${id} does not exist`)
  }
  return documentSnapshot.ref.delete()
}
