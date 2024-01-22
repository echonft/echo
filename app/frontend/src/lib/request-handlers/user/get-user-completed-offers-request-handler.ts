import { type ApiRequest } from '@echo/api/types/api-request'
import { type OffersResponse } from '@echo/api/types/responses/offers-response'
import { getOffersForUser } from '@echo/firestore/crud/offer/get-offers-for-user'
import type { OfferQueryFilters } from '@echo/firestore/types/query/offer-query-filters'
import { ErrorStatus } from '@echo/frontend/lib/constants/error-status'
import { guardAsyncFn, guardFn } from '@echo/frontend/lib/helpers/error/guard'
import { parseConstraintsQuery } from '@echo/frontend/lib/helpers/request/parse-constraints-query'
import { parseOfferFiltersQuery } from '@echo/frontend/lib/helpers/request/parse-offer-filters-query'
import { OFFER_STATE_COMPLETED } from '@echo/model/constants/offer-states'
import { NextResponse } from 'next/server'
import { assoc, dissoc, pipe } from 'ramda'

export async function getUserCompletedOffersRequestHandler(req: ApiRequest<never>, params: { username: string }) {
  const { username } = params
  const constraints = guardFn(parseConstraintsQuery, ErrorStatus.BAD_REQUEST)(req)
  const filters = guardFn(parseOfferFiltersQuery, ErrorStatus.BAD_REQUEST)(req)
  const completedOffersFilters = pipe<[OfferQueryFilters], OfferQueryFilters, OfferQueryFilters>(
    assoc('states', [OFFER_STATE_COMPLETED]),
    dissoc('notStates')
  )(filters ?? {})
  const offers = await guardAsyncFn(getOffersForUser, ErrorStatus.SERVER_ERROR)(
    username,
    completedOffersFilters,
    constraints
  )
  return NextResponse.json<OffersResponse>({ offers })
}
