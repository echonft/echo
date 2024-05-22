import { getUsersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-users-collection-reference'
import { getDocumentSnapshotData } from '@echo/firestore/helpers/crud/document/get-document-snapshot-data'
import { getQueryUniqueDocumentSnapshot } from '@echo/firestore/helpers/crud/query/get-query-unique-document-snapshot'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import type { UserDocumentData } from '@echo/firestore/types/model/user/user-document-data'
import type { Nullable } from '@echo/utils/types/nullable'
import type { DocumentSnapshot } from 'firebase-admin/firestore'
import { andThen, pipe } from 'ramda'

export function getUserSnapshotByUsername(username: string): Promise<Nullable<DocumentSnapshot<UserDocumentData>>> {
  return pipe(getUsersCollectionReference, queryWhere('username', '==', username), getQueryUniqueDocumentSnapshot)()
}

export function getUserByUsername(username: string): Promise<Nullable<UserDocumentData>> {
  return pipe(getUserSnapshotByUsername, andThen(getDocumentSnapshotData))(username)
}
