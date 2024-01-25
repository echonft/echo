import { getOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offers-collection-reference'
import { getQueryUniqueData } from '@echo/firestore/helpers/crud/query/get-query-unique-data'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import type { Offer } from '@echo/model/types/offer'
import { pipe } from 'ramda'

export function findOfferById(id: string): Promise<Offer | undefined> {
  return pipe(getOffersCollectionReference, queryWhere('id', '==', id), getQueryUniqueData)()
}
