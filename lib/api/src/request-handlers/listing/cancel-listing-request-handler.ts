import { getUserFromSession } from '../../helpers/auth/get-user-from-session'
import { assertAllowedMethods } from '../../helpers/error/assert-allowed-methods'
import { assertListing } from '../../helpers/listing/assert-listing'
import { cancelListing } from '../../helpers/listing/cancel-listing'
import { getListing } from '../../helpers/listing/get-listing'
import { parseCancelListingRequest } from '../../helpers/listing/parse-cancel-listing-request'
import { assertUserIs } from '../../helpers/user/assert-user-is'
import { ApiRequest, ApiResponse, EmptyResponse, IdRequest } from '@echo/api-public'
import { AuthOptions } from 'next-auth'

export async function cancelListingRequestHandler(
  req: ApiRequest<IdRequest>,
  res: ApiResponse<EmptyResponse>,
  authOptions: AuthOptions
) {
  assertAllowedMethods(req, ['POST'])
  const user = await getUserFromSession(req, res, authOptions)
  const { id } = parseCancelListingRequest(req.body)
  const listing = await getListing(id)
  assertListing(listing)
  assertUserIs(listing!.creator.id, user)
  await cancelListing(id)
  return res.status(200).json({})
}
