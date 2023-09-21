import type { FirestoreDiscordUser } from '@echo/firestore/types/model/discord-user/firestore-discord-user'
import { discordUserMock } from '@echo/firestore-mocks/discord-user/discord-user-mock'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'

export function getAllDiscordUserMocks() {
  return Object.values(discordUserMock) as NonEmptyArray<FirestoreDiscordUser>
}
