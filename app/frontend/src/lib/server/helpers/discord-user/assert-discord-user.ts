import type { FirestoreDiscordUser } from '@echo/firestore/types/model/firestore-discord-user'
import { NotFoundError } from '@server/helpers/error/not-found-error'
import { isNil } from 'ramda'

export function assertDiscordUser(
  user: Partial<FirestoreDiscordUser> | undefined
): asserts user is NonNullable<Partial<FirestoreDiscordUser>> {
  if (isNil(user)) {
    throw new NotFoundError('discord user is nil')
  }
}
