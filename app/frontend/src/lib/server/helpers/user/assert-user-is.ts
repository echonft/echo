import type { FirestoreDiscordUser } from '@echo/firestore/types/model/firestore-discord-user'
import { ForbiddenError } from '@server/helpers/error/forbidden-error'

export const assertUserIs = (userId: string | undefined, user: FirestoreDiscordUser) => {
  if (user.id !== userId) {
    throw new ForbiddenError(`user with id ${user.id} was supposed to have id ${userId}`)
  }
}
