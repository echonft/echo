import { signatureSchema } from './signature-schema'
import { siweMessageSchema } from './siwe-message-schema'
import { walletSchema } from './wallet-schema'
import { z } from 'zod'

export const addWalletSchema = z.object({
  wallet: walletSchema.required(),
  signature: signatureSchema,
  message: siweMessageSchema
})
