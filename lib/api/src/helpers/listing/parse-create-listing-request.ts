import { createListingSchema } from '../../validators/create-listing-schema'
import { BadRequestError } from '../error/bad-request-error'
import { CreateListingRequest } from '@echo/api-public'

export const parseCreateListingRequest = (request: CreateListingRequest) => {
  try {
    return createListingSchema.parse(request)
  } catch (e) {
    throw new BadRequestError()
  }
}
