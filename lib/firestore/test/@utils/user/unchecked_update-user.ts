import { getUsersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-users-collection-reference'
import { updateReference } from '@echo/firestore/helpers/crud/reference/update-reference'
import type { User } from '@echo/firestore/types/model/user/user'
import type { WriteResult } from 'firebase-admin/firestore'
import { omit, pipe } from 'ramda'

export function unchecked_updateUser(user: User): Promise<WriteResult> {
  return pipe(getUsersCollectionReference, updateReference(user.id, omit(['id'], user)))()
}
