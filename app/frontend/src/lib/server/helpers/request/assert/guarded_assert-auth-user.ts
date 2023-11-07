import type { UserDocumentData } from '@echo/firestore/types/model/user/user-document-data'
import { UnauthorizedError } from '@echo/frontend/lib/server/helpers/error/unauthorized-error'
import { isNil } from 'ramda'

export function guarded_assertAuthUser(
  user: UserDocumentData | undefined
): asserts user is NonNullable<UserDocumentData> {
  if (isNil(user)) {
    throw new UnauthorizedError()
  }
}
