import { createOfferSchema } from '../../types/validators/create-offer-schema'
import { ApiError } from '../api-error'
import { CreateOfferRequest } from '@echo/api-public'

export const parseCreateOfferSchema = (request: CreateOfferRequest) => {
  try {
    return createOfferSchema.parse(request)
  } catch (e) {
    throw new ApiError(400, 'Invalid request')
  }
}
