import { usersCollection } from '@echo/firestore/helpers/collection/collections'
import { deleteReference } from '@echo/firestore/helpers/reference/delete-reference'

export function deleteUser(id: string): Promise<string> {
  return deleteReference({
    collectionReference: usersCollection(),
    id
  })
}
