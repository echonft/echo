import type { ApiRequest } from '@echo/api/types/base/api-request'
import type { GetOfferResponse } from '@echo/api/types/responses/get-offer-response'
import { assertOffer } from '@server/helpers/offer/assert-offer'
import { getOffer } from '@server/helpers/offer/get-offer'
import { mapOffer } from '@server/mappers/to-response/map-offer'
import { NextResponse } from 'next/server'

export async function getOfferHandler(_req: ApiRequest<never>, offerId: string) {
  const offer = await getOffer(offerId)
  assertOffer(offer)
  return NextResponse.json<GetOfferResponse>({ offer: mapOffer(offer) })
}
