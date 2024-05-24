import { getListingsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listings-collection-reference'
import { updateReference } from '@echo/firestore/helpers/crud/reference/update-reference'
import { type Listing } from '@echo/model/types/listing'

export function unchecked_updateListing(id: string, data: Partial<Listing>): Promise<Listing> {
  return updateReference<Listing>({
    collectionReference: getListingsCollectionReference(),
    id,
    data
  })
}
