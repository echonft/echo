import { ApiError } from '../../helpers/api-error'
import { assertListing } from '../../helpers/listing/assert-listing'
import { cancelListing } from '../../helpers/listing/cancel-listing'
import { getListing } from '../../helpers/listing/get-listing'
import { parseCancelListingRequest } from '../../helpers/listing/parse-cancel-listing-request'
import { assertUserIs } from '../../helpers/user/assert-user-is'
import { RequestHandler } from '../../types/handlers/request-handler'
import { ApiRequest, EmptyResponse, IdRequest } from '@echo/api-public'

export const cancelListingHandler: RequestHandler<ApiRequest<IdRequest, never>, EmptyResponse> = async (
  req,
  res,
  session
) => {
  try {
    const { id } = parseCancelListingRequest(req.body)
    const listing = await getListing(id)
    assertListing(listing)
    assertUserIs(listing!.creator.id, session)
    await cancelListing(id)
    return res.status(200).json({})
  } catch (e) {
    const { status, message } = e as ApiError
    res.end(res.status(status).json({ error: message }))
    return
  }
}
