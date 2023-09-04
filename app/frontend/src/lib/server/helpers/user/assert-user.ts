import { BadRequestError } from '../error/bad-request-error'
import { User } from '@echo/firestore-types'
import { isNil } from 'ramda'

export function assertUser(user: User | undefined): asserts user is NonNullable<User> {
  if (isNil(user)) {
    throw new BadRequestError()
  }
}
