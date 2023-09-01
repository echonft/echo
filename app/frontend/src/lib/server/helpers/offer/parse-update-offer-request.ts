import { updateOfferRequestSchema } from '../../validators/update-offer-request-schema'
import { BadRequestError } from '../error/bad-request-error'
import { UpdateOfferRequest } from '@echo/api-public'

export const parseUpdateOfferRequest = (request: UpdateOfferRequest) => {
  try {
    return updateOfferRequestSchema.parse(request)
  } catch (e) {
    throw new BadRequestError()
  }
}
