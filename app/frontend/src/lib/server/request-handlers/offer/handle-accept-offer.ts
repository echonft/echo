import type { EmptyResponse } from '@echo/api/types/responses/empty-response'
import type { FirestoreDiscordUser } from '@echo/firestore/types/model/firestore-discord-user'
import { acceptOffer } from '@server/helpers/offer/accept-offer'
import { assertOffer } from '@server/helpers/offer/assert-offer'
import { getOffer } from '@server/helpers/offer/get-offer'
import { assertUserIs } from '@server/helpers/user/assert-user-is'
import { NextResponse } from 'next/server'

export async function handleAcceptOffer(offerId: string, user: FirestoreDiscordUser) {
  const offer = await getOffer(offerId)
  assertOffer(offer)
  assertUserIs(offer.receiver.id, user)
  await acceptOffer(offerId)
  return NextResponse.json<EmptyResponse>({})
}
