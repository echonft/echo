import { noncesCollection } from '@echo/firestore/helpers/collection/collections'
import { getDocumentSnapshotData } from '@echo/firestore/helpers/document/get-document-snapshot-data'
import { getQueryUniqueDocumentSnapshot } from '@echo/firestore/helpers/query/get-query-unique-document-snapshot'
import { queryWhere } from '@echo/firestore/helpers/query/query-where'
import type { NonceDocument } from '@echo/firestore/types/model/nonce-document'
import type { Nullable } from '@echo/utils/types/nullable'
import type { QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { andThen, pipe } from 'ramda'

export function getNonceSnapshot(userId: string): Promise<Nullable<QueryDocumentSnapshot<NonceDocument>>> {
  return pipe(noncesCollection, queryWhere('userId', '==', userId), getQueryUniqueDocumentSnapshot)()
}

export function getNonce(userId: string): Promise<Nullable<NonceDocument>> {
  return pipe(getNonceSnapshot, andThen(getDocumentSnapshotData))(userId)
}
