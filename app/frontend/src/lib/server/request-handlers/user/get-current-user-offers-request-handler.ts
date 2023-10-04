import type { ApiRequest } from '@echo/api/types/base/api-request'
import type { GetOffersResponse } from '@echo/api/types/responses/get-offers-response'
import { getUserOffers } from '@server/helpers/offer/get-user-offers'
import { getUserFromRequest } from '@server/helpers/request/get-user-from-request'
import { parseConstraintsQuery } from '@server/helpers/request/parse-constraints-query'
import { parseOfferFiltersQuery } from '@server/helpers/request/parse-offer-filters-query'
import { NextResponse } from 'next/server'

export async function getCurrentUserOffersRequestHandler(req: ApiRequest<never>) {
  const constraints = parseConstraintsQuery(req)
  const filters = parseOfferFiltersQuery(req)
  const user = await getUserFromRequest(req)
  const offers = await getUserOffers(user.username, filters, constraints)
  return NextResponse.json<GetOffersResponse>({ offers })
}
