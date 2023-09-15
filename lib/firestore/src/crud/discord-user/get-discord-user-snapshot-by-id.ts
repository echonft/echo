import { CollectionName } from '@echo/firestore/constants/collection-name'
import { discordUserDataConverter } from '@echo/firestore/converters/discord-user-data-converter'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { FirestoreDiscordUser } from '@echo/firestore/types/model/firestore-discord-user'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import type { QueryDocumentSnapshot } from 'firebase-admin/lib/firestore'
import { head } from 'ramda'

export async function getDiscordUserSnapshotById(id: string) {
  const querySnapshot = await firestoreApp()
    .collection(CollectionName.DISCORD_USERS)
    .where('id', '==', id)
    .withConverter(discordUserDataConverter)
    .get()

  if (querySnapshot.empty || isNilOrEmpty(querySnapshot.docs)) {
    return undefined
  }

  return head(querySnapshot.docs) as QueryDocumentSnapshot<FirestoreDiscordUser>
}
