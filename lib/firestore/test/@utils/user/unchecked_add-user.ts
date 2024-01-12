import { findUserById } from '@echo/firestore/crud/user/find-user-by-id'
import { getUsersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-users-collection-reference'
import type { User } from '@echo/firestore/types/model/user/user'
import type { UserDocumentData } from '@echo/firestore/types/model/user/user-document-data'

export async function unchecked_addUser(data: UserDocumentData): Promise<User> {
  const reference = getUsersCollectionReference().doc()
  await reference.set(data, { merge: true })
  return (await findUserById(reference.id))!
}
