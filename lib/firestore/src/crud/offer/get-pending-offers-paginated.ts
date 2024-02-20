import { getOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offers-collection-reference'
import { getQueryData } from '@echo/firestore/helpers/crud/query/get-query-data'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import { setPaginatedResult } from '@echo/firestore/helpers/pagination/set-paginated-result'
import type { PaginatedArgs } from '@echo/firestore/types/paginated-args'
import type { PaginatedResult } from '@echo/firestore/types/paginated-result'
import { NOT_READ_ONLY_OFFER_STATES } from '@echo/model/constants/offer-states'
import { type Offer } from '@echo/model/types/offer'
import { now } from '@echo/utils/helpers/now'
import { andThen, partial, pipe } from 'ramda'

export function getPendingOffersPaginated(args: PaginatedArgs): Promise<PaginatedResult<Offer>> {
  const { page } = args
  return pipe(
    getOffersCollectionReference,
    queryWhere('expiresAt', '>', now()),
    queryWhere('state', 'in', NOT_READ_ONLY_OFFER_STATES),
    getQueryData,
    andThen(partial(setPaginatedResult, [page]))
  )()
}
