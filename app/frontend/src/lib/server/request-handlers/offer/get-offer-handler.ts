import { assertOffer } from '../../helpers/offer/assert-offer'
import { getOffer } from '../../helpers/offer/get-offer'
import { mapOffer } from '../../mappers/to-response/map-offer'
import { ApiRequest, GetOfferResponse } from '@echo/api'
import { NextResponse } from 'next/server'

export async function getOfferHandler(_req: ApiRequest<never>, offerId: string) {
  const offer = await getOffer(offerId)
  assertOffer(offer)
  return NextResponse.json<GetOfferResponse>({ offer: mapOffer(offer) })
}
