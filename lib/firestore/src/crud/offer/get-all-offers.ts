import { getOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offers-collection-reference'
import { getQueryData } from '@echo/firestore/helpers/crud/query/get-query-data'
import type { Offer } from '@echo/model/types/offer'
import { pipe } from 'ramda'

export function getAllOffers(): Promise<Offer[]> {
  return pipe(getOffersCollectionReference, getQueryData)()
}
