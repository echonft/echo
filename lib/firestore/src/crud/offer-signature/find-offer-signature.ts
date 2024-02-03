import { getOfferSignaturesCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offer-signatures-collection-reference'
import { getQueryUniqueData } from '@echo/firestore/helpers/crud/query/get-query-unique-data'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import type { OfferSignature } from '@echo/model/types/offer-signature'
import type { Nullable } from '@echo/utils/types/nullable'
import { pipe } from 'ramda'

export function findOfferSignature(offerId: string): Promise<Nullable<OfferSignature>> {
  return pipe(
    getOfferSignaturesCollectionReference,
    queryWhere<OfferSignature>('offerId', '==', offerId),
    getQueryUniqueData
  )()
}
