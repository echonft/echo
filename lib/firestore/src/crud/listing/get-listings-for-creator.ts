import { getListingsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listings-collection-reference'
import { getQueryData } from '@echo/firestore/helpers/crud/query/get-query-data'
import { queryOrderBy } from '@echo/firestore/helpers/crud/query/query-order-by'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import { type Listing } from '@echo/model/types/listing'
import { pipe } from 'ramda'

export function getListingsForCreator(username: string): Promise<Listing[]> {
  return pipe(
    getListingsCollectionReference,
    queryWhere<Listing>('creator.username', '==', username),
    queryOrderBy<Listing>('expiresAt', 'desc'),
    getQueryData
  )()
}
