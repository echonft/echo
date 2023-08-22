import { createListingSchema } from '../../types/validators/create-listing-schema'
import { ApiError } from '../api-error'
import { CreateListingRequest } from '@echo/api-public'

export const parseCreateListingRequest = (request: CreateListingRequest) => {
  try {
    return createListingSchema.parse(request)
  } catch (e) {
    throw new ApiError(400, 'Invalid request')
  }
}
