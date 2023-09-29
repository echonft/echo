import type { FirestoreUser } from '@echo/firestore/types/model/user/firestore-user'
import { BadRequestError } from '@server/helpers/error/bad-request-error'
import { isNil } from 'ramda'

export function assertUser(user: FirestoreUser | undefined): asserts user is NonNullable<FirestoreUser> {
  if (isNil(user)) {
    throw new BadRequestError('user is nil')
  }
}
