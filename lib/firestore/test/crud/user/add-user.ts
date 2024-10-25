import { usersCollection } from '@echo/firestore/helpers/collection/collections'
import { setReference } from '@echo/firestore/helpers/reference/set-reference'
import type { UserDocument } from '@echo/firestore/types/model/user-document'

export async function addUser(data: UserDocument): Promise<string> {
  return setReference({
    collectionReference: usersCollection(),
    data
  })
}
