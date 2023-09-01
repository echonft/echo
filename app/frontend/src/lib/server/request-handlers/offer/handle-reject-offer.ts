import { assertOffer } from '../../helpers/offer/assert-offer'
import { getOffer } from '../../helpers/offer/get-offer'
import { rejectOffer } from '../../helpers/offer/reject-offer'
import { assertUserIs } from '../../helpers/user/assert-user-is'
import { EmptyResponse } from '@echo/api-public'
import { User } from '@echo/firestore'
import { NextResponse } from 'next/server'

export async function handleRejectOffer(offerId: string, user: User) {
  const offer = await getOffer(offerId)
  assertOffer(offer)
  assertUserIs(offer!.receiver.id, user)
  await rejectOffer(offerId)
  return NextResponse.json<EmptyResponse>({})
}
