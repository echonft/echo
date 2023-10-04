import { getNftCollectionDiscordGuildsCollection } from '@echo/firestore/helpers/collection/get-nft-collection-discord-guilds-collection'
import { getQuerySnapshotDocumentsData } from '@echo/firestore/helpers/crud/get-query-snapshot-documents-data'
import type { FirestoreNftCollectionDiscordGuild } from '@echo/firestore/types/model/nft-collection-discord-guild/firestore-nft-collection-discord-guild'

export async function getNftCollectionDiscordGuildsByNftCollectionId(
  collectionId: string
): Promise<FirestoreNftCollectionDiscordGuild[]> {
  const querySnapshot = await getNftCollectionDiscordGuildsCollection().where('collectionId', '==', collectionId).get()
  return getQuerySnapshotDocumentsData(querySnapshot)
}
