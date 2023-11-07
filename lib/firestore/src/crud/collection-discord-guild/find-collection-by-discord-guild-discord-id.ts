import { findCollectionById } from '@echo/firestore/crud/collection/find-collection-by-id'
import { getCollectionDiscordGuildsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-collection-discord-guilds-collection-reference'
import { getQuerySnapshotDocumentData } from '@echo/firestore/helpers/crud/query/get-query-snapshot-document-data'
import { isNil } from 'ramda'

export async function findCollectionByDiscordGuildDiscordId(guildDiscordId: string) {
  const querySnapshot = await getCollectionDiscordGuildsCollectionReference()
    .where('guild.discordId', '==', guildDiscordId)
    .get()

  // FIXME since it returns only the first result, it will not work with collections on Echo server
  const discordGuild = getQuerySnapshotDocumentData(querySnapshot)
  if (isNil(discordGuild)) {
    return undefined
  }
  return await findCollectionById(discordGuild.collectionId)
}
