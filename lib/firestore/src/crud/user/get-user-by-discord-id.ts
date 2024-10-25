import { usersCollection } from '@echo/firestore/helpers/collection/collections'
import { getDocumentSnapshotData } from '@echo/firestore/helpers/document/get-document-snapshot-data'
import { getQueryUniqueDocumentSnapshot } from '@echo/firestore/helpers/query/get-query-unique-document-snapshot'
import { queryWhere } from '@echo/firestore/helpers/query/query-where'
import type { UserDocument } from '@echo/firestore/types/model/user-document'
import type { Nullable } from '@echo/utils/types/nullable'
import { QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { andThen, pipe } from 'ramda'

export function getUserSnapshotByDiscordId(discordId: string): Promise<Nullable<QueryDocumentSnapshot<UserDocument>>> {
  return pipe(usersCollection, queryWhere('discord.id', '==', discordId), getQueryUniqueDocumentSnapshot)()
}

export function getUserByDiscordId(discordId: string): Promise<Nullable<UserDocument>> {
  return pipe(getUserSnapshotByDiscordId, andThen(getDocumentSnapshotData))(discordId)
}
