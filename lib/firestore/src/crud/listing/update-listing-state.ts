import { getListingSnapshotById } from '@echo/firestore/crud/listing/get-listing-snapshot-by-id'
import { assertQueryDocumentSnapshot } from '@echo/firestore/helpers/crud/assert-query-document-snapshot'
import { assertListingIsNotExpired } from '@echo/model/helpers/listing/assert/assert-listing-is-not-expired'
import { assertListingState } from '@echo/model/helpers/listing/assert/assert-listing-state'
import { type ListingState } from '@echo/model/types/listing-state'
import dayjs from 'dayjs'
import { WriteResult } from 'firebase-admin/lib/firestore'

export async function updateListingState(listingId: string, state: ListingState): Promise<WriteResult> {
  const documentSnapshot = await getListingSnapshotById(listingId)
  assertQueryDocumentSnapshot(documentSnapshot)
  const listing = documentSnapshot.data()
  assertListingIsNotExpired(listing)
  assertListingState(listing, state)
  return await documentSnapshot.ref.update({ state, updatedAt: dayjs().unix() })
}
