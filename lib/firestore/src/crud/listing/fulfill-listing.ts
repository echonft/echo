import { listingDataConverter } from '../../converters/listing-data-converter'
import { assertListing } from '../../helpers/listing/assert-listing'
import { getListingSnapshotById } from './get-listing-snapshot-by-id'
import { WriteResult } from 'firebase-admin/firestore'

export const fulfillListing = async (id: string): Promise<WriteResult> => {
  const documentSnapshot = await getListingSnapshotById(id)
  assertListing(documentSnapshot?.data())
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return documentSnapshot.ref.update(listingDataConverter.toFirestore({ state: 'FULFILLED' }))
}
