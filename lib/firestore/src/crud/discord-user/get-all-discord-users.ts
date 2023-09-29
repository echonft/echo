import { CollectionName } from '@echo/firestore/constants/collection-name'
import { discordUserDataConverter } from '@echo/firestore/converters/discord-user/discord-user-data-converter'
import { getQuerySnapshotDocumentsData } from '@echo/firestore/helpers/crud/get-query-snapshot-documents-data'
import { firestoreApp } from '@echo/firestore/services/firestore-app'

export async function getAllDiscordUsers() {
  const querySnapshot = await firestoreApp()
    .collection(CollectionName.DISCORD_USERS)
    .withConverter(discordUserDataConverter)
    .get()
  return getQuerySnapshotDocumentsData(querySnapshot)
}
