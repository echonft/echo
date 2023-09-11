import type { ApiRequest, GetOffersResponse } from '@echo/api/types'
import { getUserFromSession } from '@server/helpers/auth/get-user-from-session'
import { getUserOffers } from '@server/helpers/offer/get-user-offers'
import { parseConstraintsQuery } from '@server/helpers/request/parse-constraints-query'
import { parseOfferFiltersQuery } from '@server/helpers/request/parse-offer-filters-query'
import { mapOffer } from '@server/mappers/to-response/map-offer'
import { NextResponse } from 'next/server'
import type { AuthOptions } from 'next-auth'
import { map } from 'ramda'

export async function getCurrentUserOffersRequestHandler(req: ApiRequest<never>, authOptions: AuthOptions) {
  const constraints = parseConstraintsQuery(req)
  const filters = parseOfferFiltersQuery(req)
  const user = await getUserFromSession(authOptions)
  const offers = await getUserOffers(user.id, filters, constraints)
  return NextResponse.json<GetOffersResponse>({ offers: map(mapOffer, offers) })
}
