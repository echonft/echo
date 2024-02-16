import { CollectionReferenceName } from '@echo/firestore/constants/collection-reference/collection-reference-name'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import { type CollectionDiscordGuild } from '@echo/firestore/types/model/collection-discord-guild/collection-discord-guild'
import { CollectionReference } from 'firebase-admin/firestore'

export function getCollectionDiscordGuildsCollectionReference(): CollectionReference<
  CollectionDiscordGuild,
  CollectionDiscordGuild
> {
  return firestoreApp().collection(CollectionReferenceName.COLLECTION_DISCORD_GUILDS) as CollectionReference<
    CollectionDiscordGuild,
    CollectionDiscordGuild
  >
}
