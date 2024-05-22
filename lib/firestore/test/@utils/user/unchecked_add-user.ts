import { getUsersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-users-collection-reference'
import { setReference } from '@echo/firestore/helpers/crud/reference/set-reference'
import type { UserDocumentData } from '@echo/firestore/types/model/user/user-document-data'
import type { NewDocument } from '@echo/firestore/types/new-document'
import { now } from '@echo/utils/helpers/now'
import { assoc, pipe } from 'ramda'

export async function unchecked_addUser(
  user: Omit<UserDocumentData, 'createdAt' | 'updatedAt'>
): Promise<NewDocument<UserDocumentData>> {
  const data: UserDocumentData = pipe(assoc('createdAt', now()), assoc('updatedAt', now()))(user)
  const id = await setReference<UserDocumentData>({
    collectionReference: getUsersCollectionReference(),
    data
  })
  return { id, data }
}
