import { ForbiddenError } from '../error/forbidden-error'
import { User } from '@echo/firestore'

export const assertUserIs = (userId: string, user: User) => {
  if (user.id !== userId) {
    throw new ForbiddenError()
  }
}
