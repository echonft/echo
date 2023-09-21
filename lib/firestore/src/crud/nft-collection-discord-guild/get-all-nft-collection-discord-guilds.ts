import { CollectionName } from '@echo/firestore/constants/collection-name'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { FirestoreNftCollectionDiscordGuild } from '@echo/firestore/types/model/nft-collection/firestore-nft-collection-discord-guild'
import { invoker, map } from 'ramda'

export async function getAllNftCollectionDiscordGuilds() {
  const querySnapshot = await firestoreApp().collection(CollectionName.NFT_COLLECTION_DISCORD_GUILDS).get()
  return map(invoker(0, 'data'), querySnapshot.docs) as FirestoreNftCollectionDiscordGuild[]
}
