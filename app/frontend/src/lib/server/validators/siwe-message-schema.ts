import { addressSchema } from './address-schema'
import { chainIdSchema } from './chain-id-schema'
import { z } from 'zod'

export const siweMessageSchema = z.object({
  domain: z.string(),
  address: addressSchema,
  statement: z.string().optional(),
  uri: z.string(),
  version: z.string(),
  chainId: chainIdSchema,
  nonce: z.string(),
  issuedAt: z.string().datetime().optional(),
  expirationTime: z.string().datetime().optional(),
  notBefore: z.string().datetime().optional(),
  requestId: z.string().optional(),
  resources: z.string().array().optional()
})
