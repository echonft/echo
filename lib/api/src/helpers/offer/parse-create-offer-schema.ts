import { createOfferSchema } from '../../types/validators/create-offer'
import { ApiError } from '../api-error'
import { CreateOfferRequest } from '@echo/api-public'

export const parseCreateOfferSchema = (request: CreateOfferRequest, errorStatus: number, errorMessage: string) => {
  try {
    return createOfferSchema.parse(request)
  } catch (e) {
    throw new ApiError(errorStatus, errorMessage)
  }
}
