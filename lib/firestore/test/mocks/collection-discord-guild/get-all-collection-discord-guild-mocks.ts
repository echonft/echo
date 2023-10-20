import { type CollectionDiscordGuild } from '@echo/firestore/types/model/collection-discord-guild/collection-discord-guild'
import { collectionDiscordGuildMock } from '@echo/firestore-mocks/collection-discord-guild/collection-discord-guild-mock'
import { type NonEmptyArray } from '@echo/utils/types/non-empty-array'

export function getAllCollectionDiscordGuildMocks() {
  return Object.values(collectionDiscordGuildMock) as NonEmptyArray<CollectionDiscordGuild>
}
