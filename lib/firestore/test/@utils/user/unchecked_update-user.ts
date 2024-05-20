import { getUsersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-users-collection-reference'
import { updateReference } from '@echo/firestore/helpers/crud/reference/update-reference'
import type { UserDocumentData } from '@echo/firestore/types/model/user/user-document-data'
import { omit } from 'ramda'

export function unchecked_updateUser(user: UserDocumentData): Promise<UserDocumentData> {
  return updateReference<UserDocumentData>({
    collectionReference: getUsersCollectionReference(),
    id: user.id,
    data: omit(['id'], user)
  })
}
