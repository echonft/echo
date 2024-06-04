import { chainSchema } from '@echo/utils/validators/chain-schema'
import { evmAddressSchema } from '@echo/utils/validators/evm-address-schema'
import { object } from 'zod'

export const walletSchema = object({
  chain: chainSchema,
  address: evmAddressSchema
})
