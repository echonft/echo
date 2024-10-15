import { CollectionReferenceName } from '@echo/firestore/constants/collection-reference-name'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import { type CollectionDiscordGuildDocumentData } from '@echo/firestore/types/model/collection-discord-guild-document-data'
import { CollectionReference } from 'firebase-admin/firestore'

export function getCollectionDiscordGuildsCollectionReference(): CollectionReference<
  CollectionDiscordGuildDocumentData,
  CollectionDiscordGuildDocumentData
> {
  return firestoreApp().collection(CollectionReferenceName.CollectionDiscordGuilds) as CollectionReference<
    CollectionDiscordGuildDocumentData,
    CollectionDiscordGuildDocumentData
  >
}
