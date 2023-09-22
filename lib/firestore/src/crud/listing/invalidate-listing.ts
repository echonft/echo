import { listingDataConverter } from '@echo/firestore/converters/listing/listing-data-converter'
import { getListingSnapshotById } from '@echo/firestore/crud/listing/get-listing-snapshot-by-id'
import { assertListingIsNotExpired } from '@echo/firestore/helpers/listing/assert/assert-listing-is-not-expired'
import { assertListingStateIs } from '@echo/firestore/helpers/listing/assert/assert-listing-state-is'
import type { WriteResult } from 'firebase-admin/lib/firestore'

export async function invalidateListing(id: string): Promise<WriteResult> {
  const documentSnapshot = await getListingSnapshotById(id)
  assertListingIsNotExpired(documentSnapshot?.data())
  assertListingStateIs(documentSnapshot?.data(), 'OPEN')
  return documentSnapshot.ref.update(listingDataConverter.toFirestore({ state: 'INVALID' }))
}
