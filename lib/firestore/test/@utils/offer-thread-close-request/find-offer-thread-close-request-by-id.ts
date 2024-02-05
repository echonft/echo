import { getOfferThreadsCloseRequestsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offer-threads-close-requests-collection-reference'
import { getQueryUniqueData } from '@echo/firestore/helpers/crud/query/get-query-unique-data'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import type { OfferThreadCloseRequest } from '@echo/firestore/types/model/offer-thread-close-request/offer-thread-close-request'
import type { Nullable } from '@echo/utils/types/nullable'
import { pipe } from 'ramda'

export function findOfferThreadCloseRequestById(id: string): Promise<Nullable<OfferThreadCloseRequest>> {
  return pipe(getOfferThreadsCloseRequestsCollectionReference, queryWhere('id', '==', id), getQueryUniqueData)()
}
