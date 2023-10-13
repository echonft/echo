import { getNftCollectionDiscordGuildsCollection } from '@echo/firestore/helpers/collection/get-nft-collection-discord-guilds-collection'
import { getQuerySnapshotDocumentsData } from '@echo/firestore/helpers/crud/get-query-snapshot-documents-data'
import type { CollectionDiscordGuild } from '@echo/firestore/types/model/collection-discord-guild/collection-discord-guild'

export async function getNftCollectionDiscordGuildsByNftCollectionId(
  collectionId: string
): Promise<CollectionDiscordGuild[]> {
  const querySnapshot = await getNftCollectionDiscordGuildsCollection().where('collectionId', '==', collectionId).get()
  return getQuerySnapshotDocumentsData(querySnapshot)
}
