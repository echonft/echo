import { listingDataConverter } from '../../converters/listing-data-converter'
import { cleanAndUpdateDocumentRef } from '../../helpers/crud/clean-and-update-document-ref'
import { getListingSnapshotById } from './get-listing-snapshot-by-id'
import { Listing } from '@echo/firestore-types'
import { WriteResult } from 'firebase-admin/firestore'
import { isNil } from 'ramda'

export const updateListing = async (id: string, listing: Partial<Omit<Listing, 'id'>>): Promise<WriteResult> => {
  const documentSnapshot = await getListingSnapshotById(id)
  if (isNil(documentSnapshot)) {
    throw Error('invalid listing id')
  }

  return cleanAndUpdateDocumentRef(documentSnapshot.ref, listing, listingDataConverter)
}
