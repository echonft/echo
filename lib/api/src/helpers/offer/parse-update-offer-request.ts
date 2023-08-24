import { updateOfferRequestSchema } from '../../types/validators/update-offer-request-schema'
import { ApiError } from '../api-error'
import { UpdateOfferRequest } from '@echo/api-public'

export const parseUpdateOfferRequest = (request: UpdateOfferRequest) => {
  try {
    return updateOfferRequestSchema.parse(request)
  } catch (e) {
    throw new ApiError(400, 'Invalid request')
  }
}
