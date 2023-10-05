import { CollectionName } from '@echo/firestore/constants/collection-name'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { FirestoreNftCollectionDiscordGuild } from '@echo/firestore/types/model/nft-collection-discord-guild/firestore-nft-collection-discord-guild'
import type { CollectionReference } from 'firebase-admin/lib/firestore'

export function getNftCollectionDiscordGuildsCollection() {
  return firestoreApp().collection(
    CollectionName.NFT_COLLECTION_DISCORD_GUILDS
  ) as CollectionReference<FirestoreNftCollectionDiscordGuild>
}
