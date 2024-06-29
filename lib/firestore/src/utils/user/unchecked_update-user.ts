import { getUserSnapshotByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import { getUsersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-users-collection-reference'
import { updateReference } from '@echo/firestore/helpers/crud/reference/update-reference'
import type { UserDocumentData } from '@echo/firestore/types/model/user/user-document-data'
import { isNil } from 'ramda'

export async function unchecked_updateUser(username: string, data: UserDocumentData): Promise<UserDocumentData> {
  const snapshot = await getUserSnapshotByUsername(username)
  if (isNil(snapshot)) {
    return Promise.reject(Error(`user with username ${username} does not exist`))
  }
  return updateReference<UserDocumentData>({
    collectionReference: getUsersCollectionReference(),
    id: snapshot.id,
    data
  })
}
