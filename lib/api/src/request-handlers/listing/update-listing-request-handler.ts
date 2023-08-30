import { getUserFromSession } from '../../helpers/auth/get-user-from-session'
import { parseUpdateListingRequest } from '../../helpers/listing/parse-update-listing-request'
import { handleCancelListing } from './handle-cancel-listing'
import { ApiRequest, UpdateListingAction, UpdateListingRequest } from '@echo/api-public'
import { AuthOptions } from 'next-auth'

export async function updateListingRequestHandler(req: ApiRequest<UpdateListingRequest>, authOptions: AuthOptions) {
  const requestBody = await req.json()
  const { id, action } = parseUpdateListingRequest(requestBody)
  const user = await getUserFromSession(authOptions)
  switch (action) {
    case UpdateListingAction.CANCEL:
      return handleCancelListing(id, user)
  }
}
