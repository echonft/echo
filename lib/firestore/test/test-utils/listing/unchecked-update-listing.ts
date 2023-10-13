import { getListingSnapshotById } from '@echo/firestore/crud/listing/get-listing-snapshot-by-id'
import { assertQueryDocumentSnapshot } from '@echo/firestore/helpers/crud/assert-query-document-snapshot'
import type { FirestoreListing } from '@echo/firestore/types/model/listing/firestore-listing'
import type { WriteResult } from 'firebase-admin/lib/firestore'

export async function uncheckedUpdateListing(
  listingId: string,
  updateData: Partial<Omit<FirestoreListing, 'id'>>
): Promise<WriteResult> {
  const documentSnapshot = await getListingSnapshotById(listingId)
  assertQueryDocumentSnapshot(documentSnapshot)
  return await documentSnapshot.ref.update(updateData)
}
