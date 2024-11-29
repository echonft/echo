import { serializeSwapSchema } from '@echo/model/validators/swap-schema'
import { object } from 'zod'

export const swapDetailsSearchParamsSchema = object({
  swap: serializeSwapSchema
}).strict()
