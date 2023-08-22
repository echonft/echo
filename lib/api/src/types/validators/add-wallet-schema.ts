import { signatureSchema } from './signature-schema'
import { walletSchema } from './wallet-schema'
import { SiweMessage } from 'siwe'
import { z } from 'zod'

export const addWalletSchema = z.object({
  wallet: walletSchema.required(),
  signature: signatureSchema,
  message: z.instanceof(SiweMessage)
})
