import { logSchema } from '@echo/frontend/lib/validators/log-schema'
import { array, object } from 'zod'

export const blockDataSchema = object({
  logs: array(logSchema)
})
