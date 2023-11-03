import { type ApiRequest } from '@echo/api/types/api-request'
import { type OffersResponse } from '@echo/api/types/responses/offers-response'
import { guarded_getOffersForUser } from '@echo/frontend/lib/server/helpers/offer/guarded_get-offers-for-user'
import { parseConstraintsQuery } from '@echo/frontend/lib/server/helpers/request/parse-constraints-query'
import { parseOfferFiltersQuery } from '@echo/frontend/lib/server/helpers/request/parse-offer-filters-query'
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
  const offers = await guarded_getOffersForUser(username, completedOffersFilters, constraints)
  return NextResponse.json<OffersResponse>({ offers })
}
