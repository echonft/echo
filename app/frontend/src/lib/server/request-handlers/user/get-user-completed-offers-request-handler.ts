import type { ApiRequest } from '@echo/api/types/base/api-request'
import type { GetOffersResponse } from '@echo/api/types/responses/get-offers-response'
import { getUserOffers } from '@server/helpers/offer/get-user-offers'
import { parseConstraintsQuery } from '@server/helpers/request/parse-constraints-query'
import { parseOfferFiltersQuery } from '@server/helpers/request/parse-offer-filters-query'
import { NextResponse } from 'next/server'
import { assoc, dissoc, pipe } from 'ramda'

export async function getUserCompletedOffersRequestHandler(req: ApiRequest<never>, username: string) {
  const constraints = parseConstraintsQuery(req)
  const filters = parseOfferFiltersQuery(req)
  const completedOffersFilters = pipe(
    assoc('states', ['COMPLETED']),
    dissoc('notStates'),
    assoc('includeExpired', true)
  )(filters)
  const offers = await getUserOffers(username, completedOffersFilters, constraints)
  return NextResponse.json<GetOffersResponse>({ offers })
}
