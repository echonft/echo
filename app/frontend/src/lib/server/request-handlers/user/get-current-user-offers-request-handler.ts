import { type ApiRequest } from '@echo/api/types/api-request'
import { type OffersResponse } from '@echo/api/types/responses/offers-response'
import { guarded_getOffersForUser } from '@echo/frontend/lib/server/helpers/offer/guarded_get-offers-for-user'
import { guarded_getUserFromRequest } from '@echo/frontend/lib/server/helpers/request/guarded_get-user-from-request'
import { guarded_parseConstraintsQuery } from '@echo/frontend/lib/server/helpers/request/guarded_parse-constraints-query'
import { guarded_parseOfferFiltersQuery } from '@echo/frontend/lib/server/helpers/request/guarded_parse-offer-filters-query'
import { NextResponse } from 'next/server'

export async function getCurrentUserOffersRequestHandler(req: ApiRequest<never>) {
  const constraints = guarded_parseConstraintsQuery(req)
  const filters = guarded_parseOfferFiltersQuery(req)
  const user = await guarded_getUserFromRequest(req)
  const offers = await guarded_getOffersForUser(user.username, filters, constraints)
  return NextResponse.json<OffersResponse>({ offers })
}
