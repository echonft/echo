import { hexStringSchema } from '@echo/utils/validators/hex-string-schema'
import { array, object } from 'zod'

export const logSchema = object({
  address: hexStringSchema,
  topics: array(hexStringSchema).nonempty(),
  transactionHash: hexStringSchema
})
