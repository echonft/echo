import { updateOfferRequestSchema } from '../../validators/update-offer-request-schema'
import { ApiError } from '../error/api-error'
import { UpdateOfferRequest } from '@echo/api-public'
import { errorMessage } from '@echo/utils'

export const parseUpdateOfferRequest = (request: UpdateOfferRequest) => {
  try {
    return updateOfferRequestSchema.parse(request)
  } catch (e) {
    throw new ApiError(400, `Invalid request: ${errorMessage(e)}`)
  }
}
