import { CollectionName } from '@echo/firestore/constants/collection-name'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { FirestoreNftCollectionDiscordGuild } from '@echo/firestore/types/model/nft-collection/firestore-nft-collection-discord-guild'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { invoker, map } from 'ramda'

export async function getNftCollectionDiscordGuildsByNftCollectionId(
  collectionId: string
): Promise<FirestoreNftCollectionDiscordGuild[]> {
  const querySnapshot = await firestoreApp()
    .collection(CollectionName.NFT_COLLECTION_DISCORD_GUILDS)
    .where('collectionId', '==', collectionId)
    .get()

  if (querySnapshot.empty || isNilOrEmpty(querySnapshot.docs)) {
    return [] as FirestoreNftCollectionDiscordGuild[]
  }

  return map(invoker(0, 'data'), querySnapshot.docs) as FirestoreNftCollectionDiscordGuild[]
}
