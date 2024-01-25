import { getOfferThreadsCloseRequestsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offer-threads-close-requests-collection-reference'
import { getQueryData } from '@echo/firestore/helpers/crud/query/get-query-data'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import type { OfferThreadCloseRequest } from '@echo/firestore/types/model/offer-thread-close-request/offer-thread-close-request'
import { now } from '@echo/utils/helpers/now'
import { pipe } from 'ramda'

export function getAllReadyOfferThreadCloseRequests(): Promise<OfferThreadCloseRequest[]> {
  return pipe(
    getOfferThreadsCloseRequestsCollectionReference,
    queryWhere<OfferThreadCloseRequest>('closeAt', '<', now()),
    getQueryData
  )()
}
