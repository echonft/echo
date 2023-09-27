import { CollectionName } from '@echo/firestore/constants/collection-name'
import { discordUserDataConverter } from '@echo/firestore/converters/discord-user/discord-user-data-converter'
import { getQuerySnapshotDocumentSnapshot } from '@echo/firestore/helpers/crud/get-query-snapshot-document-snapshot'
import { firestoreApp } from '@echo/firestore/services/firestore-app'

export async function getDiscordUserSnapshotById(id: string) {
  const querySnapshot = await firestoreApp()
    .collection(CollectionName.DISCORD_USERS)
    .where('id', '==', id)
    .withConverter(discordUserDataConverter)
    .get()

  return getQuerySnapshotDocumentSnapshot(querySnapshot)
}
