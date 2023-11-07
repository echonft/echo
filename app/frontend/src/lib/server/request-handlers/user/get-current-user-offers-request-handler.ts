import { type ApiRequest } from '@echo/api/types/api-request'
import { type OffersResponse } from '@echo/api/types/responses/offers-response'
import { getOffersForUser } from '@echo/firestore/crud/offer/get-offers-for-user'
import { ErrorStatus } from '@echo/frontend/lib/server/constants/error-status'
import { guardAsyncFn, guardFn } from '@echo/frontend/lib/server/helpers/error/guard'
import { guarded_assertAuthUser } from '@echo/frontend/lib/server/helpers/request/assert/guarded_assert-auth-user'
import { getUserFromRequest } from '@echo/frontend/lib/server/helpers/request/get-user-from-request'
import { parseOfferFiltersQuery } from '@echo/frontend/lib/server/helpers/request/parse_offer_filters_query'
import { parseConstraintsQuery } from '@echo/frontend/lib/server/helpers/request/parse-constraints-query'
import { NextResponse } from 'next/server'

export async function getCurrentUserOffersRequestHandler(req: ApiRequest<never>) {
  const constraints = guardFn(parseConstraintsQuery, ErrorStatus.BAD_REQUEST)(req)
  const filters = guardFn(parseOfferFiltersQuery, ErrorStatus.BAD_REQUEST)(req)
  const user = await getUserFromRequest(req)
  guarded_assertAuthUser(user)
  const offers = await guardAsyncFn(getOffersForUser, ErrorStatus.SERVER_ERROR)(user.username, filters, constraints)
  return NextResponse.json<OffersResponse>({ offers })
}
