import { getUsersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-users-collection-reference'
import { setReference } from '@echo/firestore/helpers/crud/reference/set-reference'
import type { UserDocumentData } from '@echo/firestore/types/model/user/user-document-data'
import { now } from '@echo/utils/helpers/now'
import { assoc, pipe } from 'ramda'

export async function unchecked_addUser(
  data: Omit<UserDocumentData, 'id' | 'createdAt' | 'updatedAt'>
): Promise<UserDocumentData> {
  const user: UserDocumentData = pipe(assoc('createdAt', now()), assoc('updatedAt', now()))(data)
  await setReference<UserDocumentData>({
    collectionReference: getUsersCollectionReference(),
    data: user
  })
  return data
}
