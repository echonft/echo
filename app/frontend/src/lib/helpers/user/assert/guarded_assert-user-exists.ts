import type { UserDocumentData } from '@echo/firestore/types/model/user/user-document-data'
import { NotFoundError } from '@echo/frontend/lib/helpers/error/not-found-error'
import { isNil } from 'ramda'

export function guarded_assertUserExists(
  user: UserDocumentData | undefined,
  username: string
): asserts user is NonNullable<UserDocumentData> {
  if (isNil(user)) {
    throw new NotFoundError(`user with username ${username} not found`)
  }
}
