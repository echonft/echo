import { idRequestSchema } from '../../validators/id-request-schema'
import { BadRequestError } from '../error/bad-request-error'
import { IdRequest } from '@echo/api-public'

export const parseCancelListingRequest = (request: IdRequest) => {
  try {
    return idRequestSchema.parse(request)
  } catch (e) {
    throw new BadRequestError()
  }
}
