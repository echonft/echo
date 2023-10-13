import type { UserDocumentData } from '@echo/firestore/types/model/user/user-document-data'
import { BadRequestError } from '@server/helpers/error/bad-request-error'
import { isNil } from 'ramda'

export function assertUser(user: UserDocumentData | undefined): asserts user is NonNullable<UserDocumentData> {
  if (isNil(user)) {
    throw new BadRequestError('user is nil')
  }
}
