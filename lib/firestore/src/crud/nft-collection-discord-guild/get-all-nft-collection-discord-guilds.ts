import { getNftCollectionDiscordGuildsCollection } from '@echo/firestore/helpers/collection/get-nft-collection-discord-guilds-collection'
import { getQuerySnapshotDocumentsData } from '@echo/firestore/helpers/crud/get-query-snapshot-documents-data'

export async function getAllNftCollectionDiscordGuilds() {
  const querySnapshot = await getNftCollectionDiscordGuildsCollection().get()
  return getQuerySnapshotDocumentsData(querySnapshot)
}
