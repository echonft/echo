import { listingDataConverter } from '@echo/firestore/converters/listing-data-converter'
import { getListingSnapshotById } from '@echo/firestore/crud/listing/get-listing-snapshot-by-id'
import { cleanAndUpdateDocumentRef } from '@echo/firestore/helpers/crud/clean-and-update-document-ref'
import type { FirestoreListing } from '@echo/firestore/types/model/firestore-listing'
import type { WriteResult } from 'firebase-admin/firestore'
import { isNil } from 'ramda'

export async function updateListing(id: string, listing: Partial<Omit<FirestoreListing, 'id'>>): Promise<WriteResult> {
  const documentSnapshot = await getListingSnapshotById(id)
  if (isNil(documentSnapshot)) {
    throw Error('invalid listing id')
  }

  return cleanAndUpdateDocumentRef(documentSnapshot.ref, listing, listingDataConverter)
}
