import { listingDataConverter } from '@echo/firestore/converters/listing/listing-data-converter'
import { getListingSnapshotById } from '@echo/firestore/crud/listing/get-listing-snapshot-by-id'
import { assertSnapshot } from '@echo/firestore/helpers/crud/assert-snapshot'
import { cleanAndUpdateDocumentRef } from '@echo/firestore/helpers/crud/clean-and-update-document-ref'
import type { FirestoreListing } from '@echo/firestore/types/model/listing/firestore-listing'
import type { WriteResult } from 'firebase-admin/lib/firestore'

export async function updateListing(id: string, listing: Partial<Omit<FirestoreListing, 'id'>>): Promise<WriteResult> {
  const documentSnapshot = await getListingSnapshotById(id)
  assertSnapshot(documentSnapshot)
  return cleanAndUpdateDocumentRef(documentSnapshot.ref, listing, listingDataConverter)
}
