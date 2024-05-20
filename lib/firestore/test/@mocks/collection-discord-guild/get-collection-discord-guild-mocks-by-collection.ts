import { type CollectionDiscordGuild } from '@echo/firestore/types/model/collection-discord-guild/collection-discord-guild'
import { getAllCollectionDiscordGuildMocks } from '@echo/firestore-mocks/collection-discord-guild/get-all-collection-discord-guild-mocks'
import { filter, propEq } from 'ramda'

export function getCollectionDiscordGuildMocksByCollection(slug: string) {
  const mocks = getAllCollectionDiscordGuildMocks()
  return filter(propEq(slug, 'collectionSlug'), mocks) as CollectionDiscordGuild[]
}
