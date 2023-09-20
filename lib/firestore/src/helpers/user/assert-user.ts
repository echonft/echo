import type { FirestoreDiscordUser } from '@echo/firestore/types/model/firestore-discord-user'
import { propIsNil } from '@echo/utils/fp/prop-is-nil'
import { isNil } from 'ramda'

export function assertUser(
  user: Partial<FirestoreDiscordUser> | undefined
): asserts user is NonNullable<Partial<FirestoreDiscordUser>> {
  if (isNil(user)) {
    throw Error('user is not defined')
  }
  if (propIsNil('id', user)) {
    throw Error('user does not have an id')
  }
}
