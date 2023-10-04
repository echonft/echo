import { signatureSchema } from '@server/validators/signature-schema'
import { walletSchema } from '@server/validators/wallet-schema'
import { z } from 'zod'

export const addWalletSchema = z.object({
  wallet: walletSchema.required(),
  signature: signatureSchema,
  message: z.string().nonempty()
})
