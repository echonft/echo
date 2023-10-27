import { getListingSnapshotById } from '@echo/firestore/crud/listing/get-listing-snapshot-by-id'
import { assertQueryDocumentSnapshot } from '@echo/firestore/helpers/crud/assert-query-document-snapshot'
import { assertListingState } from '@echo/model/helpers/listing/assert/assert-listing-state'
import { type ListingState } from '@echo/model/types/listing-state'
import { now } from '@echo/utils/helpers/now'
import { WriteResult } from 'firebase-admin/firestore'

export async function updateListingState(listingId: string, state: ListingState): Promise<WriteResult> {
  const documentSnapshot = await getListingSnapshotById(listingId)
  assertQueryDocumentSnapshot(documentSnapshot)
  const listing = documentSnapshot.data()
  assertListingState(listing, state)
  return await documentSnapshot.ref.update({ state, updatedAt: now() })
}
