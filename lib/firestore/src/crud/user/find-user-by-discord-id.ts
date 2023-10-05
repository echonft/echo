import { getUsersCollection } from '@echo/firestore/helpers/collection/get-users-collection'
import { getQuerySnapshotDocumentData } from '@echo/firestore/helpers/crud/get-query-snapshot-document-data'

export async function findUserByDiscordId(discordId: string) {
  const querySnapshot = await getUsersCollection().where('discord.id', '==', discordId).get()
  return getQuerySnapshotDocumentData(querySnapshot)
}
