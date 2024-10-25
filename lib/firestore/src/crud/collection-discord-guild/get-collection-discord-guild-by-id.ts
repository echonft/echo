import { collectionDiscordGuildsCollection } from '@echo/firestore/helpers/collection/collections'
import { getReferenceById } from '@echo/firestore/helpers/reference/get-reference-by-id'
import { getReferenceData } from '@echo/firestore/helpers/reference/get-reference-data'
import { type CollectionDiscordGuildDocument } from '@echo/firestore/types/model/collection-discord-guild-document'
import type { Nullable } from '@echo/utils/types/nullable'
import type { DocumentReference } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

function getCollectionDiscordGuildReferenceById(id: string): DocumentReference<CollectionDiscordGuildDocument> {
  return getReferenceById({
    collectionReference: collectionDiscordGuildsCollection(),
    id
  })
}

export function getCollectionDiscordGuildById(id: string): Promise<Nullable<CollectionDiscordGuildDocument>> {
  return pipe(getCollectionDiscordGuildReferenceById, getReferenceData)(id)
}
