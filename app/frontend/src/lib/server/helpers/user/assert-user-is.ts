import type { FirestoreUser } from '@echo/firestore/types/model/firestore-user'
import { ForbiddenError } from '@server/helpers/error/forbidden-error'

export const assertUserIs = (userId: string | undefined, user: FirestoreUser) => {
  if (user.id !== userId) {
    throw new ForbiddenError(`user with id ${user.id} was supposed to have id ${userId}`)
  }
}
