import { serializeOfferSchema } from '@echo/model/validators/offer-schema'
import { object } from 'zod'

export const offerDetailsSearchParamsSchema = object({
  offer: serializeOfferSchema
}).strict()
