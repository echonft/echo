import type { FirestoreUser } from '@echo/firestore/types/model/firestore-user'
import { NotFoundError } from '@server/helpers/error/not-found-error'
import { isNil } from 'ramda'

export function assertUserExists(
  username: string,
  user: Partial<FirestoreUser> | undefined
): asserts user is NonNullable<Partial<FirestoreUser>> {
  if (isNil(user)) {
    throw new NotFoundError(`user with username ${username} does not exist`)
  }
}
