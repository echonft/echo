import { NotFoundError } from '../error/not-found-error'
import { User } from '@echo/firestore-types'
import { isNil } from 'ramda'

export function assertUserExists(
  username: string,
  user: Partial<User> | undefined
): asserts user is NonNullable<Partial<User>> {
  if (isNil(user)) {
    throw new NotFoundError(`user with username ${username} does not exist`)
  }
}
