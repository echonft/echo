import { CollectionName } from '@echo/firestore/constants/collection-name'
import { findNftCollectionById } from '@echo/firestore/crud/nft-collection/find-nft-collection-by-id'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import { FirestoreNftCollectionDiscordGuild } from '@echo/firestore/types/model/nft-collection-discord-guild/firestore-nft-collection-discord-guild'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import type { QueryDocumentSnapshot } from 'firebase-admin/lib/firestore'
import { head } from 'ramda'

export async function findNftCollectionByDiscordGuildDiscordId(guildDiscordId: string) {
  const querySnapshot = await firestoreApp()
    .collection(CollectionName.NFT_COLLECTION_DISCORD_GUILDS)
    .where('guild.discordId', '==', guildDiscordId)
    .get()

  if (querySnapshot.empty || isNilOrEmpty(querySnapshot.docs)) {
    return undefined
  }
  // FIXME since it returns only the first result, it will not work with collections on Echo server
  const { collectionId } = (
    head(querySnapshot.docs) as QueryDocumentSnapshot<FirestoreNftCollectionDiscordGuild>
  ).data()
  return await findNftCollectionById(collectionId)
}
