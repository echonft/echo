import { getAllCollectionDiscordGuildMocks } from '@echo/firestore-mocks/collection-discord-guild/get-all-collection-discord-guild-mocks'
import { filter, propEq } from 'ramda'

export function getCollectionDiscordGuildMocksByCollection(collectionId: string) {
  return filter(propEq(collectionId, 'collectionId'), getAllCollectionDiscordGuildMocks())
}
