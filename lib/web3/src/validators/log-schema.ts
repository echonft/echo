import { evmAddressSchema } from '@echo/model/validators/evm-address-schema'
import { hexStringSchema } from '@echo/model/validators/hex-string-schema'
import { object } from 'zod'

export const logSchema = object({
  address: evmAddressSchema,
  topics: hexStringSchema.array().nonempty(),
  transactionHash: hexStringSchema
})
