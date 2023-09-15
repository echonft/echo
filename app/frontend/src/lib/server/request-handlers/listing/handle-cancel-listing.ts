import type { EmptyResponse } from '@echo/api/types/responses/empty-response'
import type { FirestoreDiscordUser } from '@echo/firestore/types/model/firestore-discord-user'
import { assertListing } from '@server/helpers/listing/assert-listing'
import { cancelListing } from '@server/helpers/listing/cancel-listing'
import { getListing } from '@server/helpers/listing/get-listing'
import { assertUserIs } from '@server/helpers/user/assert-user-is'
import { NextResponse } from 'next/server'

export async function handleCancelListing(listingId: string, user: FirestoreDiscordUser) {
  const listing = await getListing(listingId)
  assertListing(listing)
  assertUserIs(listing.creator?.id, user)
  await cancelListing(listingId)
  return NextResponse.json<EmptyResponse>({})
}
