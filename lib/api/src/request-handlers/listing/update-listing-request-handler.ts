import { getUserFromSession } from '../../helpers/auth/get-user-from-session'
import { parseUpdateListingRequest } from '../../helpers/listing/parse-update-listing-request'
import { handleCancelListing } from './handle-cancel-listing'
import { ApiRequest, UpdateListingRequest } from '@echo/api-public'
import { AuthOptions } from 'next-auth'

export async function updateListingRequestHandler(
  req: ApiRequest<UpdateListingRequest>,
  authOptions: AuthOptions,
  id: string
) {
  const requestBody = await req.json()
  parseUpdateListingRequest(requestBody)
  const user = await getUserFromSession(authOptions)
  // only cancel is possible and it's been validated
  return handleCancelListing(id, user)
}
