import { getNftsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-nfts-collection-reference'
import { getQueryCount } from '@echo/firestore/helpers/crud/query/get-query-count'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import { pipe } from 'ramda'

export function getUserNftsCount(username: string): Promise<number> {
  return pipe(getNftsCollectionReference<true>, queryWhere('owner.username', '==', username), getQueryCount)(true)
}
