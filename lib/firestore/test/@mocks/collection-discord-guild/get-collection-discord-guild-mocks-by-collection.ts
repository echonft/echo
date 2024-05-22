import { getAllCollectionDiscordGuildMocks } from '@echo/firestore-mocks/collection-discord-guild/get-all-collection-discord-guild-mocks'
import { find, isNil, propEq } from 'ramda'

export function getCollectionDiscordGuildMocksByCollection(collectionId: string) {
  const mock = find(propEq(collectionId, 'collectionId'), getAllCollectionDiscordGuildMocks())
  if (isNil(mock)) {
    throw Error(`wrong CollectionDiscordGuild mock collectionId: ${collectionId}`)
  }
  return mock
}
