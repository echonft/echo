import { parseContraintsQuery } from '../../helpers/request/parse-contraints-query'
import { parseOfferFiltersQuery } from '../../helpers/request/parse-offer-filters-query'
import { mapOffer } from '../../mappers/to-response/map-offer'
import { ApiRequest } from '@echo/api'
import { GetUserOffersResponse } from '@echo/api/src/types/responses/get-user-offers-response'
import { getOffersForReceiver, getOffersForSender } from '@echo/firestore'
import { getOffersForUser } from '@echo/firestore/src/crud/offer/get-offers-for-user'
import { Offer } from '@echo/firestore-types'
import { NextResponse } from 'next/server'
import { isNil, map } from 'ramda'

export async function getUserOffersRequestHandler(req: ApiRequest<never>, userId: string) {
  const constraints = parseContraintsQuery(req)
  const filters = parseOfferFiltersQuery(req)
  let offers: Partial<Offer>[]
  if (!isNil(filters) && !isNil(filters.as)) {
    const { as } = filters
    if (as === 'sender') {
      offers = await getOffersForSender(userId, filters, constraints)
    } else {
      offers = await getOffersForReceiver(userId, filters, constraints)
    }
  } else {
    offers = await getOffersForUser(userId, filters, constraints)
  }
  return NextResponse.json<GetUserOffersResponse>({ offers: map(mapOffer, offers) })
}
