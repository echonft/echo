import type { ApiRequest } from '@echo/api/types/base/api-request'
import type { GetOffersResponse } from '@echo/api/types/responses/get-offers-response'
import { getAllOffers } from '@server/helpers/offer/get-all-offers'
import { parseConstraintsQuery } from '@server/helpers/request/parse-constraints-query'
import { parseOfferFiltersQuery } from '@server/helpers/request/parse-offer-filters-query'
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
  const offers = await getAllOffers(completedOffersFilters, constraints)
  return NextResponse.json<GetOffersResponse>({ offers })
}
