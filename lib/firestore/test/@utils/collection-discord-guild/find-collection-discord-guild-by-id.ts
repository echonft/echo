import { getCollectionDiscordGuildsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-collection-discord-guilds-collection-reference'
import { getQueryUniqueData } from '@echo/firestore/helpers/crud/query/get-query-unique-data'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import { type CollectionDiscordGuild } from '@echo/firestore/types/model/collection-discord-guild/collection-discord-guild'
import type { Nullable } from '@echo/utils/types/nullable'
import { pipe } from 'ramda'

export function findCollectionDiscordGuildById(id: string): Promise<Nullable<CollectionDiscordGuild>> {
  return pipe(getCollectionDiscordGuildsCollectionReference, queryWhere('id', '==', id), getQueryUniqueData)()
}
