import { User } from '@echo/firestore-types'
import { BadRequestError } from '@server/helpers/error/bad-request-error'
import { isNil } from 'ramda'

export function assertUser(user: Partial<User> | undefined): asserts user is NonNullable<Partial<User>> {
  if (isNil(user)) {
    throw new BadRequestError('user is nil')
  }
}
