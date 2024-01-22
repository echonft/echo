import { type ApiRequest } from '@echo/api/types/api-request'
import { type OffersResponse } from '@echo/api/types/responses/offers-response'
import { getOffersForUser } from '@echo/firestore/crud/offer/get-offers-for-user'
import { ErrorStatus } from '@echo/frontend/lib/constants/error-status'
import { guardAsyncFn, guardFn } from '@echo/frontend/lib/helpers/error/guard'
import { parseConstraintsQuery } from '@echo/frontend/lib/helpers/request/parse-constraints-query'
import { parseOfferFiltersQuery } from '@echo/frontend/lib/helpers/request/parse-offer-filters-query'
import type { AuthUser } from '@echo/model/types/auth-user'
import { NextResponse } from 'next/server'

export async function getCurrentUserOffersRequestHandler(user: AuthUser, req: ApiRequest<never>) {
  const constraints = guardFn(parseConstraintsQuery, ErrorStatus.BAD_REQUEST)(req)
  const filters = guardFn(parseOfferFiltersQuery, ErrorStatus.BAD_REQUEST)(req)
  const offers = await guardAsyncFn(getOffersForUser, ErrorStatus.SERVER_ERROR)(user.username, filters, constraints)
  return NextResponse.json<OffersResponse>({ offers })
}
