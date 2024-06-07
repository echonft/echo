import { getListingsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listings-collection-reference'
import { deleteReference } from '@echo/firestore/helpers/crud/reference/delete-reference'

export function deleteListing(id: string): Promise<string> {
  return deleteReference({
    collectionReference: getListingsCollectionReference(),
    id
  })
}
