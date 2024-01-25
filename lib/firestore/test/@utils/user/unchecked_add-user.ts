import { getUsersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-users-collection-reference'
import { setReference } from '@echo/firestore/helpers/crud/reference/set-reference'
import type { UserDocumentData } from '@echo/firestore/types/model/user/user-document-data'
import { now } from '@echo/utils/helpers/now'
import { pipe } from 'ramda'

export function unchecked_addUser(
  data: Omit<UserDocumentData, 'id' | 'createdAt' | 'updatedAt'>
): Promise<UserDocumentData> {
  return pipe(
    getUsersCollectionReference,
    setReference<UserDocumentData>({
      ...data,
      createdAt: now(),
      updatedAt: now()
    })
  )()
}
