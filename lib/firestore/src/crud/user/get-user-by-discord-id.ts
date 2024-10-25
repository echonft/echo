import { getUsersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-users-collection-reference'
import { getDocumentSnapshotData } from '@echo/firestore/helpers/crud/document/get-document-snapshot-data'
import { getQueryUniqueDocumentSnapshot } from '@echo/firestore/helpers/crud/query/get-query-unique-document-snapshot'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import type { UserDocumentData } from '@echo/firestore/types/model/user-document-data'
import type { User } from '@echo/model/types/user'
import type { Nullable } from '@echo/utils/types/nullable'
import { QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { andThen, pipe } from 'ramda'

export function getUserSnapshotByDiscordId(
  discordId: string
): Promise<Nullable<QueryDocumentSnapshot<User, UserDocumentData>>> {
  return pipe(getUsersCollectionReference, queryWhere('discord.id', '==', discordId), getQueryUniqueDocumentSnapshot)()
}

export function getUserByDiscordId(discordId: string): Promise<Nullable<User>> {
  return pipe(getUserSnapshotByDiscordId, andThen(getDocumentSnapshotData))(discordId)
}
