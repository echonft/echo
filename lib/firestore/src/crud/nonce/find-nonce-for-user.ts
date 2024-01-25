import { getNoncesCollectionReference } from '@echo/firestore/helpers/collection-reference/get-nonces-collection-reference'
import { getQueryUniqueData } from '@echo/firestore/helpers/crud/query/get-query-unique-data'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import type { Nonce } from '@echo/firestore/types/model/nonce/nonce'
import { pipe } from 'ramda'

export function findNonceForUser(userId: string): Promise<Nonce | undefined> {
  return pipe(getNoncesCollectionReference, queryWhere<Nonce>('userId', '==', userId), getQueryUniqueData)()
}
