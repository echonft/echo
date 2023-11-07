import { getUsersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-users-collection-reference'
import { getQuerySnapshotDocumentData } from '@echo/firestore/helpers/crud/query/get-query-snapshot-document-data'

export async function findUserByDiscordId(discordId: string) {
  const querySnapshot = await getUsersCollectionReference().where('discord.id', '==', discordId).get()
  return getQuerySnapshotDocumentData(querySnapshot)
}
