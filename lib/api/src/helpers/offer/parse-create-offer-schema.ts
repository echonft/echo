import { createOfferSchema } from '../../validators/create-offer-schema'
import { ApiError } from '../error/api-error'
import { CreateOfferRequest } from '@echo/api-public'
import { errorMessage } from '@echo/utils'

export const parseCreateOfferSchema = (request: CreateOfferRequest) => {
  try {
    return createOfferSchema.parse(request)
  } catch (e) {
    throw new ApiError(400, `Invalid request: ${errorMessage(e)}`)
  }
}
