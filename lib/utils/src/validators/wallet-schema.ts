import { chainSchema } from '@echo/utils/validators/chain-schema'
import { evmAddressSchema } from '@echo/utils/validators/evm-address-schema'
import { z } from 'zod'

export const walletSchema = z.object({
  chain: chainSchema,
  address: evmAddressSchema
})
