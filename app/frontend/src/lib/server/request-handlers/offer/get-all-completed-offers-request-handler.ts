import { type ApiRequest } from '@echo/api/types/api-request'
import { type OffersResponse } from '@echo/api/types/responses/offers-response'
import { guarded_getAllOffers } from '@echo/frontend/lib/server/helpers/offer/guarded_get-all-offers'
import { parseConstraintsQuery } from '@echo/frontend/lib/server/helpers/request/parse-constraints-query'
import { parseOfferFiltersQuery } from '@echo/frontend/lib/server/helpers/request/parse-offer-filters-query'
import { NextResponse } from 'next/server'
import { assoc, dissoc, pipe } from 'ramda'

export async function getAllCompletedOffersRequestHandler(req: ApiRequest<never>) {
  const constraints = parseConstraintsQuery(req)
  const filters = parseOfferFiltersQuery(req)
  const completedOffersFilters = pipe(
    assoc('states', ['COMPLETED']),
    dissoc('notStates'),
    assoc('includeExpired', true)
  )(filters)
  const offers = await guarded_getAllOffers(completedOffersFilters, constraints)
  return NextResponse.json<OffersResponse>({ offers })
}
