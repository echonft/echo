import { evmAddressSchema } from '@echo/utils/validators/evm-address-schema'
import { hexStringSchema } from '@echo/utils/validators/hex-string-schema'
import { object } from 'zod'

export const logSchema = object({
  address: evmAddressSchema,
  topics: hexStringSchema.array().nonempty(),
  transactionHash: hexStringSchema
})
