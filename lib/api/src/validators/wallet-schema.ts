import { addressSchema } from './address-schema'
import { z } from 'zod'

export const walletSchema = z.object({
  chainId: z.number().gte(1),
  address: addressSchema
})
