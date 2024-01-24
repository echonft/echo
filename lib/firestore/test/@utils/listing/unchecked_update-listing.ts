import { getListingsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listings-collection-reference'
import { updateReference } from '@echo/firestore/helpers/crud/reference/update-reference'
import { type Listing } from '@echo/model/types/listing'
import { WriteResult } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

export function unchecked_updateListing(id: string, data: Partial<Omit<Listing, 'id'>>): Promise<WriteResult> {
  return pipe(getListingsCollectionReference, updateReference(id, data))()
}
