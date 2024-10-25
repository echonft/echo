import { collectionDiscordGuildsCollection } from '@echo/firestore/helpers/collection/collections'
import { getQueryData } from '@echo/firestore/helpers/query/get-query-data'
import { queryWhere } from '@echo/firestore/helpers/query/query-where'
import type { CollectionDiscordGuildDocument } from '@echo/firestore/types/model/collection-discord-guild-document'
import { pipe } from 'ramda'

export function getCollectionDiscordGuildsByCollection(
  collectionId: string
): Promise<CollectionDiscordGuildDocument[]> {
  return pipe(collectionDiscordGuildsCollection, queryWhere('collectionId', '==', collectionId), getQueryData)()
}
