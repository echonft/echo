import { getListingSnapshotById } from '@echo/firestore/crud/listing/get-listing-snapshot-by-id'
import { assertQueryDocumentSnapshot } from '@echo/firestore/helpers/crud/assert-query-document-snapshot'
import { type Listing } from '@echo/model/types/listing'
import { type WriteResult } from 'firebase-admin/firestore'

export async function unchecked_updateListing(
  listingId: string,
  updateData: Partial<Omit<Listing, 'id'>>
): Promise<WriteResult> {
  const documentSnapshot = await getListingSnapshotById(listingId)
  assertQueryDocumentSnapshot(documentSnapshot)
  return await documentSnapshot.ref.update(updateData)
}
