import type { FirestoreDiscordUser } from '@echo/firestore/types/model/firestore-discord-user'
import { NotFoundError } from '@server/helpers/error/not-found-error'
import { isNil } from 'ramda'

export function assertUserExists(
  username: string,
  user: Partial<FirestoreDiscordUser> | undefined
): asserts user is NonNullable<Partial<FirestoreDiscordUser>> {
  if (isNil(user)) {
    throw new NotFoundError(`user with username ${username} does not exist`)
  }
}
