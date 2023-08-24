import { addressSchema } from './address-schema'
import { chainIdSchema } from './chain-id-schema'
import { z } from 'zod'

export const walletSchema = z.object({
  chainId: chainIdSchema,
  address: addressSchema
})
