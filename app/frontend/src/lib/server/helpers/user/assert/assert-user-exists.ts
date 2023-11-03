import { type UserDocumentData } from '@echo/firestore/types/model/user/user-document-data'
import { NotFoundError } from '@echo/frontend/lib/server/helpers/error/not-found-error'
import { isNil } from 'ramda'

export function assertUserExists(
  user: UserDocumentData | undefined,
  username: string
): asserts user is NonNullable<UserDocumentData> {
  if (isNil(user)) {
    throw new NotFoundError(`user with username ${username} not found`)
  }
}
