import { getCollectionDiscordGuildsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-collection-discord-guilds-collection-reference'
import { getQueryData } from '@echo/firestore/helpers/crud/query/get-query-data'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import type { CollectionDiscordGuildDocumentData } from '@echo/firestore/types/model/collection-discord-guild-document-data'
import { pipe } from 'ramda'

export function getCollectionDiscordGuildsByCollection(
  collectionId: string
): Promise<CollectionDiscordGuildDocumentData[]> {
  return pipe(
    getCollectionDiscordGuildsCollectionReference,
    queryWhere('collectionId', '==', collectionId),
    getQueryData
  )()
}
