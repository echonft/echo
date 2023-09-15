import { CollectionName } from '@echo/firestore/constants/collection-name'
import { userDiscordGuildDataConverter } from '@echo/firestore/converters/user-discord-guild-data-converter'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { FirestoreUserDiscordGuild } from '@echo/firestore/types/model/firestore-user-discord-guild'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import type { QueryDocumentSnapshot } from 'firebase-admin/lib/firestore'
import { head } from 'ramda'

export async function getUserDiscordGuildSnapshotById(id: string) {
  const querySnapshot = await firestoreApp()
    .collection(CollectionName.USER_DISCORD_GUILDS)
    .where('id', '==', id)
    .withConverter(userDiscordGuildDataConverter)
    .get()

  if (querySnapshot.empty || isNilOrEmpty(querySnapshot.docs)) {
    return undefined
  }

  return head(querySnapshot.docs) as QueryDocumentSnapshot<FirestoreUserDiscordGuild>
}
