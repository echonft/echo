import type { User } from '@echo/firestore/types/model/user/user'
import { NotFoundError } from '@echo/frontend/lib/server/helpers/error/not-found-error'
import { isNil } from 'ramda'

export function guarded_assertUserExists(user: User | undefined, username: string): asserts user is NonNullable<User> {
  if (isNil(user)) {
    throw new NotFoundError(`user with username ${username} not found`)
  }
}
