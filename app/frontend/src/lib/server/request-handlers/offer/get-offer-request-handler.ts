import { ApiRequest } from '@echo/api/types/base/api-request'
import { GetOfferResponse } from '@echo/api/types/responses/get-offer-response'
import { assertOffer } from '@server/helpers/offer/assert-offer'
import { getOffer } from '@server/helpers/offer/get-offer'
import { NextResponse } from 'next/server'

export async function getOfferRequestHandler(_req: ApiRequest<never>, id: string) {
  const offer = await getOffer(id)
  assertOffer(offer)
  return NextResponse.json<GetOfferResponse>({ offer })
}
