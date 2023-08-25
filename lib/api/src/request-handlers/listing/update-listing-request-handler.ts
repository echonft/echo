import { getUserFromSession } from '../../helpers/auth/get-user-from-session'
import { assertAllowedMethods } from '../../helpers/error/assert-allowed-methods'
import { parseUpdateListingRequest } from '../../helpers/listing/parse-update-listing-request'
import { handleCancelListing } from './handle-cancel-listing'
import { ApiRequest, ApiResponse, EmptyResponse, UpdateListingAction, UpdateListingRequest } from '@echo/api-public'
import { AuthOptions } from 'next-auth'

export async function updateListingRequestHandler(
  req: ApiRequest<UpdateListingRequest>,
  res: ApiResponse<EmptyResponse>,
  authOptions: AuthOptions
) {
  assertAllowedMethods(req, ['POST'])
  const { id, action } = parseUpdateListingRequest(req.body)
  const user = await getUserFromSession(req, res, authOptions)
  switch (action) {
    case UpdateListingAction.CANCEL:
      return handleCancelListing(id, user, res)
  }
}
