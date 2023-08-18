import { listingDataConverter } from '../../converters/listing-data-converter'
import { Listing } from '../../types/model/listing'
import { getListingSnapshotById } from './get-listing-snapshot-by-id'
import { WriteResult } from 'firebase-admin/firestore'

export const updateListing = async (
  id: string,
  listing: Omit<Listing, 'id'> | Partial<Omit<Listing, 'id'>>
): Promise<WriteResult> => {
  const documentSnapshot = await getListingSnapshotById(id)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return documentSnapshot.ref.update(listingDataConverter.toFirestore(listing))
}
