import { UserError } from '@echo/model/constants/errors/user-error'
import type { Username } from '@echo/model/types/username'
import { updateUser } from '@echo/test/firestore/crud/user/update-user'
import { userDocumentMocks } from '@echo/test/firestore/initialize-db'
import { find, isNil, propEq } from 'ramda'

export function resetUser(username: Username) {
  const user = find(propEq(username, 'username'), userDocumentMocks)
  if (isNil(user)) {
    throw Error(UserError.NotFound)
  }
  return updateUser(username, user)
}
