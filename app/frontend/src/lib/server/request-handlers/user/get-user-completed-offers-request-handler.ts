import { type ApiRequest } from '@echo/api/types/api-request'
import { type OffersResponse } from '@echo/api/types/responses/offers-response'
import { guarded_getOffersForUser } from '@echo/frontend/lib/server/helpers/offer/guarded_get-offers-for-user'
import { guarded_parseConstraintsQuery } from '@echo/frontend/lib/server/helpers/request/guarded_parse-constraints-query'
import { guarded_parseOfferFiltersQuery } from '@echo/frontend/lib/server/helpers/request/guarded_parse-offer-filters-query'
import { NextResponse } from 'next/server'
import { assoc, dissoc, pipe } from 'ramda'

export async function getUserCompletedOffersRequestHandler(req: ApiRequest<never>, username: string) {
  const constraints = guarded_parseConstraintsQuery(req)
  const filters = guarded_parseOfferFiltersQuery(req)
  const completedOffersFilters = pipe(
    assoc('states', ['COMPLETED']),
    dissoc('notStates'),
    assoc('includeExpired', true)
  )(filters)
  const offers = await guarded_getOffersForUser(username, completedOffersFilters, constraints)
  return NextResponse.json<OffersResponse>({ offers })
}
