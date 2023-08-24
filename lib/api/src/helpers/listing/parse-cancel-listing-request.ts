import { cancelListingSchema } from '../../types/validators/cancel-listing-schema'
import { ApiError } from '../api-error'
import { IdRequest } from '@echo/api-public'

export const parseCancelListingRequest = (request: IdRequest) => {
  try {
    return cancelListingSchema.parse(request)
  } catch (e) {
    throw new ApiError(400, 'Invalid request')
  }
}
