import { type ApiRequest } from '@echo/api/types/api-request'
import { type OffersResponse } from '@echo/api/types/responses/offers-response'
import { guarded_getOffersForUser } from '@echo/frontend/lib/server/helpers/offer/guarded_get-offers-for-user'
import { getUserFromRequest } from '@echo/frontend/lib/server/helpers/request/get-user-from-request'
import { parseConstraintsQuery } from '@echo/frontend/lib/server/helpers/request/parse-constraints-query'
import { parseOfferFiltersQuery } from '@echo/frontend/lib/server/helpers/request/parse-offer-filters-query'
import { NextResponse } from 'next/server'

export async function getCurrentUserOffersRequestHandler(req: ApiRequest<never>) {
  const constraints = parseConstraintsQuery(req)
  const filters = parseOfferFiltersQuery(req)
  const user = await getUserFromRequest(req)
  const offers = await guarded_getOffersForUser(user.username, filters, constraints)
  return NextResponse.json<OffersResponse>({ offers })
}
