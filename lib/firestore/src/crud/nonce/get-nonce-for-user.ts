import { getUserSnapshotByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import { getNoncesCollectionReference } from '@echo/firestore/helpers/collection-reference/get-nonces-collection-reference'
import { getDocumentSnapshotData } from '@echo/firestore/helpers/crud/document/get-document-snapshot-data'
import { getQueryUniqueDocumentSnapshot } from '@echo/firestore/helpers/crud/query/get-query-unique-document-snapshot'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import type { Nonce } from '@echo/firestore/types/model/nonce/nonce'
import type { Nullable } from '@echo/utils/types/nullable'
import { QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { andThen, isNil, pipe } from 'ramda'

export async function getNonceSnapshotForUser(username: string): Promise<Nullable<QueryDocumentSnapshot<Nonce>>> {
  const snapshot = await getUserSnapshotByUsername(username)
  if (isNil(snapshot)) {
    return Promise.reject(Error(`user with username ${username} not found`))
  }
  return pipe(
    getNoncesCollectionReference,
    queryWhere<Nonce>('userId', '==', snapshot.id),
    getQueryUniqueDocumentSnapshot
  )()
}

export function getNonceForUser(username: string): Promise<Nullable<Nonce>> {
  return pipe(getNonceSnapshotForUser, andThen(getDocumentSnapshotData))(username)
}
