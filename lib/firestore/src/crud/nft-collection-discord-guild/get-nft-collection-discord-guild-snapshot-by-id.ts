import { CollectionName } from '@echo/firestore/constants/collection-name'
import { getQuerySnapshotDocumentSnapshot } from '@echo/firestore/helpers/crud/get-query-snapshot-document-snapshot'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import { FirestoreNftCollectionDiscordGuild } from '@echo/firestore/types/model/nft-collection-discord-guild/firestore-nft-collection-discord-guild'
import { QuerySnapshot } from 'firebase-admin/lib/firestore'

export async function getNftCollectionDiscordGuildSnapshotById(id: string) {
  const querySnapshot = await firestoreApp()
    .collection(CollectionName.NFT_COLLECTION_DISCORD_GUILDS)
    .where('id', '==', id)
    .get()

  return getQuerySnapshotDocumentSnapshot(querySnapshot as QuerySnapshot<FirestoreNftCollectionDiscordGuild>)
}
