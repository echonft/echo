import { CollectionName } from '@echo/firestore/constants/collection-name'
import { discordUserDataConverter } from '@echo/firestore/converters/discord-user/discord-user-data-converter'
import { getQuerySnapshotDocumentData } from '@echo/firestore/helpers/crud/get-query-snapshot-document-data'
import { firestoreApp } from '@echo/firestore/services/firestore-app'

export async function findDiscordUserByDiscordId(discordId: string) {
  const querySnapshot = await firestoreApp()
    .collection(CollectionName.DISCORD_USERS)
    .where('discordId', '==', discordId)
    .withConverter(discordUserDataConverter)
    .get()
  return getQuerySnapshotDocumentData(querySnapshot)
}
