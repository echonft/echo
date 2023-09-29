import { CollectionName } from '@echo/firestore/constants/collection-name'
import { getQuerySnapshotDocumentsData } from '@echo/firestore/helpers/crud/get-query-snapshot-documents-data'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { FirestoreNftCollectionDiscordGuild } from '@echo/firestore/types/model/nft-collection-discord-guild/firestore-nft-collection-discord-guild'
import { QuerySnapshot } from 'firebase-admin/lib/firestore'

export async function getAllNftCollectionDiscordGuilds() {
  const querySnapshot = await firestoreApp().collection(CollectionName.NFT_COLLECTION_DISCORD_GUILDS).get()
  return getQuerySnapshotDocumentsData(querySnapshot as QuerySnapshot<FirestoreNftCollectionDiscordGuild>)
}
