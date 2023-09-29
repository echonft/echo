import { CollectionName } from '@echo/firestore/constants/collection-name'
import { findNftCollectionById } from '@echo/firestore/crud/nft-collection/find-nft-collection-by-id'
import { getQuerySnapshotDocumentData } from '@echo/firestore/helpers/crud/get-query-snapshot-document-data'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import { FirestoreNftCollectionDiscordGuild } from '@echo/firestore/types/model/nft-collection-discord-guild/firestore-nft-collection-discord-guild'
import { QuerySnapshot } from 'firebase-admin/lib/firestore'
import { isNil } from 'ramda'

export async function findNftCollectionByDiscordGuildDiscordId(guildDiscordId: string) {
  const querySnapshot = await firestoreApp()
    .collection(CollectionName.NFT_COLLECTION_DISCORD_GUILDS)
    .where('guild.discordId', '==', guildDiscordId)
    .get()

  // FIXME since it returns only the first result, it will not work with collections on Echo server
  const discordGuild = getQuerySnapshotDocumentData(querySnapshot as QuerySnapshot<FirestoreNftCollectionDiscordGuild>)
  if (isNil(discordGuild)) {
    return undefined
  }
  return await findNftCollectionById(discordGuild.collectionId)
}
