import { getNoncesCollectionReference } from '@echo/firestore/helpers/collection-reference/get-nonces-collection-reference'
import { getDocumentSnapshotData } from '@echo/firestore/helpers/crud/document/get-document-snapshot-data'
import { getQueryUniqueDocumentSnapshot } from '@echo/firestore/helpers/crud/query/get-query-unique-document-snapshot'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import type { Nonce } from '@echo/firestore/types/model/nonce/nonce'
import type { Nullable } from '@echo/utils/types/nullable'
import { QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { andThen, pipe } from 'ramda'

export function getNonceSnapshotForUser(userId: string): Promise<Nullable<QueryDocumentSnapshot<Nonce>>> {
  return pipe(getNoncesCollectionReference, queryWhere<Nonce>('userId', '==', userId), getQueryUniqueDocumentSnapshot)()
}

export function getNonceForUser(userId: string): Promise<Nullable<Nonce>> {
  return pipe(getNonceSnapshotForUser, andThen(getDocumentSnapshotData))(userId)
}
