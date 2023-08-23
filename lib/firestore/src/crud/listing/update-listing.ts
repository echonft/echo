import { listingDataConverter } from '../../converters/listing-data-converter'
import { cleanAndUpdateDocumentRef } from '../../helpers/crud/clean-and-update-document-ref'
import { Listing } from '../../types/model/listing'
import { getListingSnapshotById } from './get-listing-snapshot-by-id'
import { WriteResult } from 'firebase-admin/firestore'
import { isNil } from 'ramda'

export const updateListing = async (
  id: string,
  listing: Omit<Listing, 'id'> | Partial<Omit<Listing, 'id'>>
): Promise<WriteResult> => {
  const documentSnapshot = await getListingSnapshotById(id)
  if (isNil(documentSnapshot)) {
    throw Error('invalid listing id')
  }

  return cleanAndUpdateDocumentRef(documentSnapshot.ref, listing, listingDataConverter)
}
