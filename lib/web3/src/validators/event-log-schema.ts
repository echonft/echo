import { addressSchema } from '@echo/model/validators/address-schema'
import { hexStringSchema } from '@echo/model/validators/hex-string-schema'
import { object } from 'zod'

export const eventLogSchema = object({
  address: addressSchema,
  topics: hexStringSchema.array().nonempty(),
  transactionHash: hexStringSchema
})
