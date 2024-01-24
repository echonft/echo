import { getOfferThreadsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offer-threads-collection-reference'
import { getQueryUniqueData } from '@echo/firestore/helpers/crud/query/get-query-unique-data'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import type { OfferThread } from '@echo/firestore/types/model/offer-thread/offer-thread'
import { pipe } from 'ramda'

export function findOfferThreadById(id: string): Promise<OfferThread | undefined> {
  return pipe(getOfferThreadsCollectionReference, queryWhere('id', '==', id), getQueryUniqueData)()
}
