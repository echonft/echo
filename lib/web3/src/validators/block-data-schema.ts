import { logSchema } from '@echo/web3/validators/log-schema'
import { array, object } from 'zod'

export const blockDataSchema = object({
  logs: array(logSchema)
})
