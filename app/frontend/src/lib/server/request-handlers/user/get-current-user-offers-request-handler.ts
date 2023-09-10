import { getUserFromSession } from '../../helpers/auth/get-user-from-session'
import { getUserOffers } from '../../helpers/offer/get-user-offers'
import { parseConstraintsQuery } from '../../helpers/request/parse-constraints-query'
import { parseOfferFiltersQuery } from '../../helpers/request/parse-offer-filters-query'
import { mapOffer } from '../../mappers/to-response/map-offer'
import { ApiRequest, GetOffersResponse } from '@echo/api'
import { NextResponse } from 'next/server'
import { AuthOptions } from 'next-auth'
import { map } from 'ramda'

export async function getCurrentUserOffersRequestHandler(req: ApiRequest<never>, authOptions: AuthOptions) {
  const constraints = parseConstraintsQuery(req)
  const filters = parseOfferFiltersQuery(req)
  const user = await getUserFromSession(authOptions)
  const offers = await getUserOffers(user.id, filters, constraints)
  return NextResponse.json<GetOffersResponse>({ offers: map(mapOffer, offers) })
}
