import { acceptOffer } from '../../helpers/offer/accept-offer'
import { assertOffer } from '../../helpers/offer/assert-offer'
import { getOffer } from '../../helpers/offer/get-offer'
import { assertUserIs } from '../../helpers/user/assert-user-is'
import { EmptyResponse } from '@echo/api'
import { User } from '@echo/firestore-types'
import { NextResponse } from 'next/server'

export async function handleAcceptOffer(offerId: string, user: User) {
  const offer = await getOffer(offerId)
  assertOffer(offer)
  assertUserIs(offer.receiver.id, user)
  await acceptOffer(offerId)
  return NextResponse.json<EmptyResponse>({})
}
