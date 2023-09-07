import { listingDataConverter } from '../../converters/listing-data-converter'
import { assertListingIsNotExpired } from '../../helpers/listing/assert/assert-listing-is-not-expired'
import { assertListingStateIs } from '../../helpers/listing/assert/assert-listing-state-is'
import { getListingSnapshotById } from './get-listing-snapshot-by-id'
import { WriteResult } from 'firebase-admin/firestore'

export async function fulfillListing(id: string): Promise<WriteResult> {
  const documentSnapshot = await getListingSnapshotById(id)
  assertListingIsNotExpired(documentSnapshot?.data())
  assertListingStateIs(documentSnapshot?.data(), 'OPEN')
  return documentSnapshot.ref.update(listingDataConverter.toFirestore({ state: 'FULFILLED' }))
}
