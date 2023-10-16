import { CollectionDiscordGuild } from '@echo/firestore/types/model/collection-discord-guild/collection-discord-guild'
import { getAllCollectionDiscordGuildMocks } from '@echo/firestore-mocks/collection-discord-guild/get-all-collection-discord-guild-mocks'
import { filter, propEq } from 'ramda'

export function getCollectionDiscordGuildMocksByCollectionId(collectionId: string) {
  const mocks = getAllCollectionDiscordGuildMocks()
  return filter(propEq(collectionId, 'collectionId'), mocks) as CollectionDiscordGuild[]
}
