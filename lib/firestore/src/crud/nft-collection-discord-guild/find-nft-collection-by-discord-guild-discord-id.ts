import { findNftCollectionById } from '@echo/firestore/crud/nft-collection/find-nft-collection-by-id'
import { getNftCollectionDiscordGuildsCollection } from '@echo/firestore/helpers/collection/get-nft-collection-discord-guilds-collection'
import { getQuerySnapshotDocumentData } from '@echo/firestore/helpers/crud/get-query-snapshot-document-data'
import { isNil } from 'ramda'

export async function findNftCollectionByDiscordGuildDiscordId(guildDiscordId: string) {
  const querySnapshot = await getNftCollectionDiscordGuildsCollection()
    .where('guild.discordId', '==', guildDiscordId)
    .get()

  // FIXME since it returns only the first result, it will not work with collections on Echo server
  const discordGuild = getQuerySnapshotDocumentData(querySnapshot)
  if (isNil(discordGuild)) {
    return undefined
  }
  return await findNftCollectionById(discordGuild.collectionId)
}
