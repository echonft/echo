import { getCollectionDiscordGuildsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-collection-discord-guilds-collection-reference'
import { getReferenceById } from '@echo/firestore/helpers/crud/reference/get-reference-by-id'
import { getReferenceData } from '@echo/firestore/helpers/crud/reference/get-reference-data'
import { type CollectionDiscordGuild } from '@echo/firestore/types/model/collection-discord-guild/collection-discord-guild'
import type { Nullable } from '@echo/utils/types/nullable'
import type { DocumentReference } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

export function getCollectionDiscordGuildReferenceById(id: string): DocumentReference<CollectionDiscordGuild> {
  return getReferenceById<CollectionDiscordGuild>({
    collectionReference: getCollectionDiscordGuildsCollectionReference(),
    id
  })
}

export function getCollectionDiscordGuildById(id: string): Promise<Nullable<CollectionDiscordGuild>> {
  return pipe(getCollectionDiscordGuildReferenceById, getReferenceData<CollectionDiscordGuild>)(id)
}
