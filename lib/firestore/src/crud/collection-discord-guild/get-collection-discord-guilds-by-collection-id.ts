import { getCollectionDiscordGuildsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-collection-discord-guilds-collection-reference'
import { getQueryData } from '@echo/firestore/helpers/crud/query/get-query-data'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import { type CollectionDiscordGuild } from '@echo/firestore/types/model/collection-discord-guild/collection-discord-guild'
import { pipe } from 'ramda'

export function getCollectionDiscordGuildsByCollectionId(collectionId: string): Promise<CollectionDiscordGuild[]> {
  return pipe(
    getCollectionDiscordGuildsCollectionReference,
    queryWhere<CollectionDiscordGuild>('collectionId', '==', collectionId),
    getQueryData
  )()
}
