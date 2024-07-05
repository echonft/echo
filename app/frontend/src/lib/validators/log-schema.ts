import { hexStringSchema } from '@echo/utils/validators/hex-string-schema'
import { array, boolean, object, string } from 'zod'

export const logSchema = object({
  address: hexStringSchema,
  blockHash: hexStringSchema,
  blockNumber: hexStringSchema,
  data: string(),
  logIndex: hexStringSchema,
  removed: boolean(),
  topics: array(hexStringSchema).nonempty(),
  transactionHash: hexStringSchema,
  transactionIndex: hexStringSchema
})
