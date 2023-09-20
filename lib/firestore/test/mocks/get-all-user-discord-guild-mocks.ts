import type { FirestoreUserDiscordGuild } from '@echo/firestore/types/model/firestore-user-discord-guild'
import { userDiscordGuildMock } from '@echo/firestore-mocks/user-discord-guild-mock'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'

export function getAllUserDiscordGuildMocks() {
  return Object.values(userDiscordGuildMock) as NonEmptyArray<FirestoreUserDiscordGuild>
}
