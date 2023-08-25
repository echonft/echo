import { assertListing } from '../../helpers/listing/assert-listing'
import { cancelListing } from '../../helpers/listing/cancel-listing'
import { getListing } from '../../helpers/listing/get-listing'
import { assertUserIs } from '../../helpers/user/assert-user-is'
import { ApiResponse, EmptyResponse } from '@echo/api-public'
import { User } from '@echo/firestore'

export async function handleCancelListing(listingId: string, user: User, res: ApiResponse<EmptyResponse>) {
  const listing = await getListing(listingId)
  assertListing(listing)
  assertUserIs(listing!.creator.id, user)
  await cancelListing(listingId)
  return res.status(200).json({})
}
