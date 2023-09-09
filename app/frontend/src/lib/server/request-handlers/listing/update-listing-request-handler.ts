import { getUserFromSession } from '../../helpers/auth/get-user-from-session'
import { BadRequestError } from '../../helpers/error/bad-request-error'
import { updateListingRequestSchema } from '../../validators/update-listing-request-schema'
import { handleCancelListing } from './handle-cancel-listing'
import { ApiRequest, UpdateListingRequest } from '@echo/api'
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

function parseUpdateListingRequest(request: UpdateListingRequest) {
  try {
    return updateListingRequestSchema.parse(request)
  } catch (e) {
    throw new BadRequestError(`error parsing update listing request ${JSON.stringify(request)}`, e)
  }
}
