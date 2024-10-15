import { collectionDiscordGuildMock } from '@echo/firestore/mocks/collection-discord-guild/collection-discord-guild-mock'
import type { CollectionDiscordGuildDocumentData } from '@echo/firestore/types/model/collection-discord-guild-document-data'
import { type NonEmptyArray } from 'ramda'

export function getAllCollectionDiscordGuildMocks() {
  return Object.values(collectionDiscordGuildMock()) as NonEmptyArray<CollectionDiscordGuildDocumentData>
}
