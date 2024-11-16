import { usersCollection } from '@echo/firestore/helpers/collection/collections'
import { getDocumentSnapshotData } from '@echo/firestore/helpers/document/get-document-snapshot-data'
import { getQueryUniqueDocumentSnapshot } from '@echo/firestore/helpers/query/get-query-unique-document-snapshot'
import { queryWhere } from '@echo/firestore/helpers/query/query-where'
import type { UserDocument } from '@echo/firestore/types/model/user-document'
import type { Nullable } from '@echo/utils/types/nullable'
import type { QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { andThen, pipe } from 'ramda'

export function getUserSnapshotByUsername(username: string): Promise<Nullable<QueryDocumentSnapshot<UserDocument>>> {
  return pipe(usersCollection, queryWhere('username', '==', username), getQueryUniqueDocumentSnapshot)()
}

export function getUserByUsername(username: string): Promise<Nullable<UserDocument>> {
  return pipe(getUserSnapshotByUsername, andThen(getDocumentSnapshotData))(username)
}
