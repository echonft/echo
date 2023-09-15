import { CollectionName } from '@echo/firestore/constants/collection-name'
import { userDiscordGuildDataConverter } from '@echo/firestore/converters/user-discord-guild-data-converter'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { FirestoreUserDiscordGuild } from '@echo/firestore/types/model/firestore-user-discord-guild'
import { invoker, map } from 'ramda'

export async function getAllUserDiscordGuilds() {
  const querySnapshot = await firestoreApp()
    .collection(CollectionName.USER_DISCORD_GUILDS)
    .withConverter(userDiscordGuildDataConverter)
    .get()
  return map(invoker(0, 'data'), querySnapshot.docs) as FirestoreUserDiscordGuild[]
}
