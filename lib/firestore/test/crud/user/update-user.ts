import { getUserSnapshotByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import { usersCollection } from '@echo/firestore/helpers/collection/collections'
import { updateReference } from '@echo/firestore/helpers/reference/update-reference'
import type { UserDocument } from '@echo/firestore/types/model/user-document'
import type { Username } from '@echo/model/types/username'
import { isNil } from 'ramda'

export async function updateUser(username: Username, data: UserDocument): Promise<UserDocument> {
  const snapshot = await getUserSnapshotByUsername(username)
  if (isNil(snapshot)) {
    return Promise.reject(Error(`user with username ${username} does not exist`))
  }
  return updateReference({
    collectionReference: usersCollection(),
    id: snapshot.id,
    data: data
  })
}
