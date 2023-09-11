import { addressSchema } from '@server/validators/address-schema'
import { chainIdSchema } from '@server/validators/chain-id-schema'
import { z } from 'zod'

export const walletSchema = z.object({
  chainId: chainIdSchema,
  address: addressSchema
})
