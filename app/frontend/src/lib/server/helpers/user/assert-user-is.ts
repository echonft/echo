import type { User } from '@echo/firestore-types'
import { ForbiddenError } from '@server/helpers/error/forbidden-error'

export const assertUserIs = (userId: string, user: User) => {
  if (user.id !== userId) {
    throw new ForbiddenError(`user with id ${user.id} was supposed to have id ${userId}`)
  }
}
