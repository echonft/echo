import { ForbiddenError } from '../error/forbidden-error'
import { User } from '@echo/firestore-types'

export const assertUserIs = (userId: string, user: User) => {
  if (user.id !== userId) {
    throw new ForbiddenError(`user with id ${user.id} was supposed to have id ${userId}`)
  }
}
