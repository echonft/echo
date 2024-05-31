import { getListingsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listings-collection-reference'
import { updateReference } from '@echo/firestore/helpers/crud/reference/update-reference'
import { type Listing } from '@echo/model/types/listing'
import type { DeepPartial } from '@echo/utils/types/deep-partial'

export function unchecked_updateListing(id: string, data: DeepPartial<Listing>): Promise<Listing> {
  return updateReference<Listing>({
    collectionReference: getListingsCollectionReference(),
    id,
    data
  })
}
