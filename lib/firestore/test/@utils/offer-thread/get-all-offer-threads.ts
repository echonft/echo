import { getOfferThreadsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offer-threads-collection-reference'
import { getQueryData } from '@echo/firestore/helpers/crud/query/get-query-data'
import type { OfferThread } from '@echo/firestore/types/model/offer-thread/offer-thread'
import { pipe } from 'ramda'

export function getAllOfferThreads(): Promise<OfferThread[]> {
  return pipe(getOfferThreadsCollectionReference, getQueryData)()
}
