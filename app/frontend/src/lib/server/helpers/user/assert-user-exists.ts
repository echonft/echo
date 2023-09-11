import type { User } from '@echo/firestore-types'
import { NotFoundError } from '@server/helpers/error/not-found-error'
import { isNil } from 'ramda'

export function assertUserExists(
  username: string,
  user: Partial<User> | undefined
): asserts user is NonNullable<Partial<User>> {
  if (isNil(user)) {
    throw new NotFoundError(`user with username ${username} does not exist`)
  }
}
