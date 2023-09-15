import { CollectionName } from '@echo/firestore/constants/collection-name'
import { discordUserDataConverter } from '@echo/firestore/converters/discord-user-data-converter'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { FirestoreDiscordUser } from '@echo/firestore/types/model/firestore-discord-user'
import type { QueryDocumentSnapshot } from 'firebase-admin/lib/firestore'
import { head, isNil } from 'ramda'

export async function getDiscordUserSnapshotByUserId(userId: string) {
  const querySnapshot = await firestoreApp()
    .collection(CollectionName.DISCORD_USERS)
    .where('userId', '==', userId)
    .withConverter(discordUserDataConverter)
    .get()

  if (querySnapshot.empty) {
    return undefined
  }

  const documentSnapshot = head(querySnapshot.docs) as QueryDocumentSnapshot<FirestoreDiscordUser>
  if (isNil(documentSnapshot)) {
    return undefined
  }

  return documentSnapshot
}
