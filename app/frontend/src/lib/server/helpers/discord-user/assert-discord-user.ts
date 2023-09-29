import type { FirestoreDiscordUser } from '@echo/firestore/types/model/discord-user/firestore-discord-user'
import { NotFoundError } from '@server/helpers/error/not-found-error'
import { isNil } from 'ramda'

export function assertDiscordUser(
  user: FirestoreDiscordUser | undefined
): asserts user is NonNullable<FirestoreDiscordUser> {
  if (isNil(user)) {
    throw new NotFoundError('discord user is nil')
  }
}
