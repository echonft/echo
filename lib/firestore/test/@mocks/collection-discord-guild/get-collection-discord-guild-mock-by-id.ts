import { collectionDiscordGuildMock } from '@echo/firestore-mocks/collection-discord-guild/collection-discord-guild-mock'
import { isNil } from 'ramda'

export function getCollectionDiscordGuildMockById(id: string) {
  const mock = collectionDiscordGuildMock[id]
  if (isNil(mock)) {
    throw Error(`wrong CollectionDiscordGuild mock id: ${id}`)
  }
  return mock
}
