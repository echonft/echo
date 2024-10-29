import { contractAugmentation } from '@echo/model/validators/contract-schema'
import { hexStringSchema } from '@echo/model/validators/hex-string-schema'
import { object, string } from 'zod'

export const addWalletRequestSchema = object(contractAugmentation).extend({
  signature: hexStringSchema,
  message: string().min(1)
})
