import { collectionDiscordGuildMock } from '@echo/firestore-mocks/collection-discord-guild/collection-discord-guild-mock'

export function getCollectionDiscordGuildMockById(id: string) {
  return collectionDiscordGuildMock[id]!
}
