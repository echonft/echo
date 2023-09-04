import { assertListing } from '../../helpers/listing/assert-listing'
import { cancelListing } from '../../helpers/listing/cancel-listing'
import { getListing } from '../../helpers/listing/get-listing'
import { assertUserIs } from '../../helpers/user/assert-user-is'
import { EmptyResponse } from '@echo/api'
import { User } from '@echo/firestore-types'
import { NextResponse } from 'next/server'

export async function handleCancelListing(listingId: string, user: User) {
  const listing = await getListing(listingId)
  assertListing(listing)
  assertUserIs(listing.creator.id, user)
  await cancelListing(listingId)
  return NextResponse.json<EmptyResponse>({})
}
