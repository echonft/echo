import type { EmptyResponse } from '@echo/api/types/responses/empty-response'
import type { FirestoreUser } from '@echo/firestore/types/model/firestore-user'
import { assertOffer } from '@server/helpers/offer/assert-offer'
import { cancelOffer } from '@server/helpers/offer/cancel-offer'
import { getOffer } from '@server/helpers/offer/get-offer'
import { assertUserIs } from '@server/helpers/user/assert-user-is'
import { NextResponse } from 'next/server'

export async function handleCancelOffer(offerId: string, user: FirestoreUser) {
  const offer = await getOffer(offerId)
  assertOffer(offer)
  assertUserIs(offer.sender.id, user)
  await cancelOffer(offerId)
  return NextResponse.json<EmptyResponse>({})
}
