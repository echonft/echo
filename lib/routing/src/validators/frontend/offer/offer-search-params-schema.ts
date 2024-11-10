import { slugSchema } from '@echo/model/validators/slug-schema'
import { object, string } from 'zod'

export const offerSearchParamsSchema = object({
  items: string().min(1).array().nonempty(),
  target: slugSchema.optional()
}).strict()
