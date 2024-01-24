import { findUserById } from '@echo/firestore/crud/user/find-user-by-id'
import { getUsersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-users-collection-reference'
import { getNewReference } from '@echo/firestore/helpers/crud/reference/get-new-reference'
import type { User } from '@echo/firestore/types/model/user/user'

export async function unchecked_addUser(data: User): Promise<User> {
  const reference = getNewReference(getUsersCollectionReference())
  await reference.set(data)
  return (await findUserById(reference.id))!
}
