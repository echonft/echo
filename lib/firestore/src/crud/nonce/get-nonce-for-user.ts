import { getUserSnapshotByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import { noncesCollection } from '@echo/firestore/helpers/collection/collections'
import { getDocumentSnapshotData } from '@echo/firestore/helpers/document/get-document-snapshot-data'
import { getQueryUniqueDocumentSnapshot } from '@echo/firestore/helpers/query/get-query-unique-document-snapshot'
import { queryWhere } from '@echo/firestore/helpers/query/query-where'
import type { NonceDocument } from '@echo/firestore/types/model/nonce-document'
import type { Username } from '@echo/model/types/username'
import type { Nullable } from '@echo/utils/types/nullable'
import { QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { andThen, isNil, pipe } from 'ramda'

export async function getNonceSnapshotForUser(
  username: Username
): Promise<Nullable<QueryDocumentSnapshot<NonceDocument>>> {
  const snapshot = await getUserSnapshotByUsername(username)
  if (isNil(snapshot)) {
    return Promise.reject(Error(`user with username ${username} not found`))
  }
  return pipe(noncesCollection, queryWhere('userId', '==', snapshot.id), getQueryUniqueDocumentSnapshot)()
}

export function getNonceForUser(username: Username): Promise<Nullable<NonceDocument>> {
  return pipe(getNonceSnapshotForUser, andThen(getDocumentSnapshotData))(username)
}
