import { cancelListingSchema } from '../../validators/cancel-listing-schema'
import { ApiError } from '../error/api-error'
import { IdRequest } from '@echo/api-public'
import { errorMessage } from '@echo/utils'

export const parseCancelListingRequest = (request: IdRequest) => {
  try {
    return cancelListingSchema.parse(request)
  } catch (e) {
    throw new ApiError(400, `Invalid request: ${errorMessage(e)}`)
  }
}
