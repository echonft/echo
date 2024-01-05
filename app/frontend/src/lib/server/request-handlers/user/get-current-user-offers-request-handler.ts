import { type ApiRequest } from '@echo/api/types/api-request'
import { type OffersResponse } from '@echo/api/types/responses/offers-response'
import { getOffersForUser } from '@echo/firestore/crud/offer/get-offers-for-user'
import { ErrorStatus } from '@echo/frontend/lib/server/constants/error-status'
import { guardAsyncFn, guardFn } from '@echo/frontend/lib/server/helpers/error/guard'
import { guarded_getAuthUser } from '@echo/frontend/lib/server/helpers/request/guarded_get-auth-user'
import { parseOfferFiltersQuery } from '@echo/frontend/lib/server/helpers/request/parse_offer_filters_query'
import { parseConstraintsQuery } from '@echo/frontend/lib/server/helpers/request/parse-constraints-query'
import { NextResponse } from 'next/server'

export async function getCurrentUserOffersRequestHandler(req: ApiRequest<never>) {
  // logger.info(`auth ${JSON.stringify(req)}`)
  const constraints = guardFn(parseConstraintsQuery, ErrorStatus.BAD_REQUEST)(req)
  const filters = guardFn(parseOfferFiltersQuery, ErrorStatus.BAD_REQUEST)(req)
  // const user = await getUserFromRequest(req)
  // guarded_assertAuthUser(user)
  const user = await guarded_getAuthUser()
  const offers = await guardAsyncFn(getOffersForUser, ErrorStatus.SERVER_ERROR)(user.username, filters, constraints)
  return NextResponse.json<OffersResponse>({ offers })
}
