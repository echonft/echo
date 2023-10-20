import { getCollectionDiscordGuildsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-collection-discord-guilds-collection-reference'
import { getQuerySnapshotDocumentsData } from '@echo/firestore/helpers/crud/get-query-snapshot-documents-data'
import { type CollectionDiscordGuild } from '@echo/firestore/types/model/collection-discord-guild/collection-discord-guild'

export async function getCollectionDiscordGuildsByCollectionId(
  collectionId: string
): Promise<CollectionDiscordGuild[]> {
  const querySnapshot = await getCollectionDiscordGuildsCollectionReference()
    .where('collectionId', '==', collectionId)
    .get()
  return getQuerySnapshotDocumentsData(querySnapshot)
}
