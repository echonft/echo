import { getUserOffers } from '../../helpers/offer/get-user-offers'
import { parseConstraintsQuery } from '../../helpers/request/parse-constraints-query'
import { parseOfferFiltersQuery } from '../../helpers/request/parse-offer-filters-query'
import { assertUser } from '../../helpers/user/assert-user'
import { getUserByUsername } from '../../helpers/user/get-user-by-username'
import { mapOffer } from '../../mappers/to-response/map-offer'
import { ApiRequest, GetOffersResponse } from '@echo/api'
import { NextResponse } from 'next/server'
import { assoc, dissoc, map, pipe } from 'ramda'

export async function getUserCompletedOffersRequestHandler(req: ApiRequest<never>, username: string) {
  const constraints = parseConstraintsQuery(req)
  const filters = parseOfferFiltersQuery(req)
  const user = await getUserByUsername(username)
  assertUser(user)
  const completedOffersFilters = pipe(
    assoc('states', ['COMPLETED']),
    dissoc('notStates'),
    assoc('includeExpired', true)
  )(filters)
  const offers = await getUserOffers(user.id, completedOffersFilters, constraints)
  return NextResponse.json<GetOffersResponse>({ offers: map(mapOffer, offers) })
}
