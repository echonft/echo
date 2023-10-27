import { getUsersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-users-collection-reference'
import type { UserDocumentData } from '@echo/firestore/types/model/user/user-document-data'
import { now } from '@echo/utils/helpers/now'

export async function uncheckedAddUser(
  data: Omit<UserDocumentData, 'id' | 'createdAt' | 'updatedAt'>
): Promise<UserDocumentData> {
  const reference = getUsersCollectionReference().doc()
  const id = reference.id
  const user: UserDocumentData = { id, createdAt: now(), updatedAt: now(), ...data }
  await reference.set(user)
  return user
}
