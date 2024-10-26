import { chainSchema } from '@echo/model/validators/chain-schema'
import { evmAddressSchema } from '@echo/model/validators/evm-address-schema'
import { object } from 'zod'

export const walletSchema = object({
  chain: chainSchema,
  address: evmAddressSchema
})
