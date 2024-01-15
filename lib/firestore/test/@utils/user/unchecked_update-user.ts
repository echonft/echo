import { getUsersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-users-collection-reference'
import type { User } from '@echo/firestore/types/model/user/user'

export async function unchecked_addUser(user: User): Promise<User> {
  const reference = getUsersCollectionReference().doc(user.id)
  await reference.update(user)
  return user
}
