import { chainSchema } from '@echo/model/validators/chain-schema'
import { evmAddressSchema } from '@echo/model/validators/evm-address-schema'
import { hexStringSchema } from '@echo/model/validators/hex-string-schema'
import { object, string } from 'zod'

export const addWalletRequestSchema = object({
  address: evmAddressSchema,
  chain: chainSchema,
  signature: hexStringSchema,
  message: string().min(1).readonly()
}).readonly()
