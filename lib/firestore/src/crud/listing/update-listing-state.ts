import { getListingSnapshotById } from '@echo/firestore/crud/listing/get-listing-snapshot-by-id'
import { assertQueryDocumentSnapshot } from '@echo/firestore/helpers/crud/assert/assert-query-document-snapshot'
import { assertListingState } from '@echo/model/helpers/listing/assert/assert-listing-state'
import type { Listing } from '@echo/model/types/listing'
import { type ListingState } from '@echo/model/types/listing-state'
import { now } from '@echo/utils/helpers/now'
import { assoc, pipe } from 'ramda'

export async function updateListingState(listingId: string, state: ListingState) {
  const documentSnapshot = await getListingSnapshotById(listingId)
  assertQueryDocumentSnapshot(documentSnapshot)
  const listing = documentSnapshot.data()
  assertListingState(listing, state)
  const updatedAt = now()
  await documentSnapshot.ref.update({ state, updatedAt })
  return pipe<[Listing], Listing, Listing>(assoc('state', state), assoc('updatedAt', updatedAt))(listing)
}
