import { createOfferSchema } from '../../validators/create-offer-schema'
import { BadRequestError } from '../error/bad-request-error'
import { CreateOfferRequest } from '@echo/api-public'

export const parseCreateOfferSchema = (request: CreateOfferRequest) => {
  try {
    return createOfferSchema.parse(request)
  } catch (e) {
    throw new BadRequestError()
  }
}
