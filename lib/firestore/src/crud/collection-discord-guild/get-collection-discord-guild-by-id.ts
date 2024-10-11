import { getCollectionDiscordGuildsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-collection-discord-guilds-collection-reference'
import { getReferenceById } from '@echo/firestore/helpers/crud/reference/get-reference-by-id'
import { getReferenceData } from '@echo/firestore/helpers/crud/reference/get-reference-data'
import { type CollectionDiscordGuildDocumentData } from '@echo/firestore/types/model/collection-discord-guild/collection-discord-guild-document-data'
import type { Nullable } from '@echo/utils/types/nullable'
import type { DocumentReference } from 'firebase-admin/firestore'
import { andThen, pipe } from 'ramda'

export function getCollectionDiscordGuildReferenceById(
  id: string
): Promise<DocumentReference<CollectionDiscordGuildDocumentData, CollectionDiscordGuildDocumentData>> {
  return getReferenceById({
    collectionReference: getCollectionDiscordGuildsCollectionReference(),
    id
  })
}

export function getCollectionDiscordGuildById(id: string): Promise<Nullable<CollectionDiscordGuildDocumentData>> {
  return pipe(getCollectionDiscordGuildReferenceById, andThen(getReferenceData))(id)
}
