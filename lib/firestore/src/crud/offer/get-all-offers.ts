import { offersCollection } from '@echo/firestore/helpers/collection/collections'
import { getQueryData } from '@echo/firestore/helpers/query/get-query-data'
import type { OfferDocument } from '@echo/firestore/types/model/offer-document'
import { pipe } from 'ramda'

export function getAllOffers(): Promise<OfferDocument[]> {
  return pipe(offersCollection, getQueryData)()
}
