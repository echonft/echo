import { updateListingRequestSchema } from '../../validators/update-listing-request-schema'
import { BadRequestError } from '../error/bad-request-error'
import { UpdateListingRequest } from '@echo/api'

export const parseUpdateListingRequest = (request: UpdateListingRequest) => {
  try {
    return updateListingRequestSchema.parse(request)
  } catch (e) {
    throw new BadRequestError()
  }
}
