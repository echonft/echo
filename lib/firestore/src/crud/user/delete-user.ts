import { getUsersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-users-collection-reference'
import { deleteReference } from '@echo/firestore/helpers/crud/reference/delete-reference'

export function deleteUser(id: string): Promise<string> {
  return deleteReference({
    collectionReference: getUsersCollectionReference(),
    id
  })
}
