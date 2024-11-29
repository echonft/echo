import { withSlugSchema } from '@echo/model/validators/slug-schema'
import { object } from 'zod'

export const swapDetailsQueryParamsSchema = object({
  swap: withSlugSchema
})
