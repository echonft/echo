import { CollectionName } from '@echo/firestore/constants/collection-name'
import { nftCollectionDataConverter } from '@echo/firestore/converters/nft-collection-data-converter'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { FirestoreNftCollection } from '@echo/firestore/types/model/firestore-nft-collection'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import type { QueryDocumentSnapshot } from 'firebase-admin/lib/firestore'
import { head } from 'ramda'

export async function findNftCollectionByDiscordGuildDiscordId(guildDiscordId: string) {
  const querySnapshot = await firestoreApp()
    .collection(CollectionName.NFT_COLLECTIONS)
    .where('discordGuild.discordId', '==', guildDiscordId)
    .withConverter(nftCollectionDataConverter)
    .get()

  if (querySnapshot.empty || isNilOrEmpty(querySnapshot.docs)) {
    return undefined
  }

  const documentSnapshot = head(querySnapshot.docs) as QueryDocumentSnapshot<FirestoreNftCollection>
  return documentSnapshot.data()
}
