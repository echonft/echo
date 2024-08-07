import { getListingsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listings-collection-reference'
import { updateReference } from '@echo/firestore/helpers/crud/reference/update-reference'
import { type Listing } from '@echo/model/types/listing'
import type { UpdateData } from 'firebase-admin/firestore'

export function updateListing(id: string, data: UpdateData<Listing>): Promise<Listing> {
  return updateReference<Listing>({
    collectionReference: getListingsCollectionReference(),
    id,
    data
  })
}
