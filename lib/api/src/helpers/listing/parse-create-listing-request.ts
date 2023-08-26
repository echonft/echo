import { createListingSchema } from '../../validators/create-listing-schema'
import { ApiError } from '../error/api-error'
import { CreateListingRequest } from '@echo/api-public'
import { errorMessage } from '@echo/utils'

export const parseCreateListingRequest = (request: CreateListingRequest) => {
  try {
    return createListingSchema.parse(request)
  } catch (e) {
    throw new ApiError(400, `Invalid request: ${errorMessage(e)}`)
  }
}
