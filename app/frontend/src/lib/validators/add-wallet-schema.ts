import { signatureSchema } from '@echo/frontend/lib/validators/signature-schema'
import { walletSchema } from '@echo/frontend/lib/validators/wallet-schema'
import { z } from 'zod'

export const addWalletSchema = z.object({
  wallet: walletSchema,
  signature: signatureSchema,
  message: z.string().min(1)
})
