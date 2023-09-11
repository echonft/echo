import type { EmptyResponse } from '@echo/api/types'
import type { User } from '@echo/firestore-types'
import { assertOffer } from '@server/helpers/offer/assert-offer'
import { getOffer } from '@server/helpers/offer/get-offer'
import { rejectOffer } from '@server/helpers/offer/reject-offer'
import { assertUserIs } from '@server/helpers/user/assert-user-is'
import { NextResponse } from 'next/server'

export async function handleRejectOffer(offerId: string, user: User) {
  const offer = await getOffer(offerId)
  assertOffer(offer)
  assertUserIs(offer.receiver.id, user)
  await rejectOffer(offerId)
  return NextResponse.json<EmptyResponse>({})
}
