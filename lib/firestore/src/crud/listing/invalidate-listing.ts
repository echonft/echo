import { listingDataConverter } from '../../converters/listing-data-converter'
import { getListingSnapshotById } from './get-listing-snapshot-by-id'
import { WriteResult } from 'firebase-admin/firestore'

export const invalidateListing = async (id: string): Promise<WriteResult> => {
  const documentSnapshot = await getListingSnapshotById(id)
  if (documentSnapshot.data().expired) {
    throw Error('listing expired')
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return documentSnapshot.ref.update(listingDataConverter.toFirestore({ state: 'INVALID' }))
}
