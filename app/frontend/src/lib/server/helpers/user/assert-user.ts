import type { FirestoreDiscordUser } from '@echo/firestore/types/model/firestore-discord-user'
import { BadRequestError } from '@server/helpers/error/bad-request-error'
import { isNil } from 'ramda'

export function assertUser(
  user: Partial<FirestoreDiscordUser> | undefined
): asserts user is NonNullable<Partial<FirestoreDiscordUser>> {
  if (isNil(user)) {
    throw new BadRequestError('user is nil')
  }
}
