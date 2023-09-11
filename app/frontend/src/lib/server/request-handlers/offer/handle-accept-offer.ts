import type { EmptyResponse } from '@echo/api/types'
import type { User } from '@echo/firestore-types'
import { acceptOffer } from '@server/helpers/offer/accept-offer'
import { assertOffer } from '@server/helpers/offer/assert-offer'
import { getOffer } from '@server/helpers/offer/get-offer'
import { assertUserIs } from '@server/helpers/user/assert-user-is'
import { NextResponse } from 'next/server'

export async function handleAcceptOffer(offerId: string, user: User) {
  const offer = await getOffer(offerId)
  assertOffer(offer)
  assertUserIs(offer.receiver.id, user)
  await acceptOffer(offerId)
  return NextResponse.json<EmptyResponse>({})
}
