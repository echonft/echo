import { getCollectionDiscordGuildsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-collection-discord-guilds-collection-reference'
import { getQuerySnapshotDocumentsData } from '@echo/firestore/helpers/crud/get-query-snapshot-documents-data'

export async function getAllCollectionDiscordGuilds() {
  const querySnapshot = await getCollectionDiscordGuildsCollectionReference().get()
  return getQuerySnapshotDocumentsData(querySnapshot)
}
