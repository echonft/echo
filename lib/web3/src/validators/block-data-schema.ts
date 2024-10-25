import { logSchema } from '@echo/web3/validators/log-schema'
import { object } from 'zod'

export const blockDataSchema = object({
  logs: logSchema.array().readonly()
}).readonly()
