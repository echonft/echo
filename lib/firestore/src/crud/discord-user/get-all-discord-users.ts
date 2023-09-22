import { CollectionName } from '@echo/firestore/constants/collection-name'
import { discordUserDataConverter } from '@echo/firestore/converters/discord-user/discord-user-data-converter'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { FirestoreDiscordUser } from '@echo/firestore/types/model/discord-user/firestore-discord-user'
import { invoker, map } from 'ramda'

export async function getAllDiscordUsers() {
  const querySnapshot = await firestoreApp()
    .collection(CollectionName.DISCORD_USERS)
    .withConverter(discordUserDataConverter)
    .get()
  return map(invoker(0, 'data'), querySnapshot.docs) as FirestoreDiscordUser[]
}
