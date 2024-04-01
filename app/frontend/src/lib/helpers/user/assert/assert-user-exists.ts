import type { UserDocumentData } from '@echo/firestore/types/model/user/user-document-data'
import { NotFoundError } from '@echo/frontend/lib/helpers/error/not-found-error'
import type { Nullable } from '@echo/utils/types/nullable'
import { isNil } from 'ramda'

export function assertUserExists(
  user: Nullable<UserDocumentData>,
  username: string
): asserts user is NonNullable<UserDocumentData> {
  if (isNil(user)) {
    throw new NotFoundError(`user with username ${username} not found`)
  }
}
