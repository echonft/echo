import type { ApiRequest } from '@echo/api/types/base/api-request'
import type { UpdateListingRequest } from '@echo/api/types/requests/update-listing-request'
import { getUserFromSession } from '@server/helpers/auth/get-user-from-session'
import { BadRequestError } from '@server/helpers/error/bad-request-error'
import { handleCancelListing } from '@server/request-handlers/listing/handle-cancel-listing'
import { updateListingRequestSchema } from '@server/validators/update-listing-request-schema'
import type { AuthOptions } from 'next-auth'

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
