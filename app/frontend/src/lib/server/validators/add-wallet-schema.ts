import { signatureSchema } from '@echo/frontend/lib/server/validators/signature-schema'
import { walletSchema } from '@echo/frontend/lib/server/validators/wallet-schema'
import { z } from 'zod'

export const addWalletSchema = z.object({
  wallet: walletSchema,
  signature: signatureSchema,
  message: z.string().nonempty()
})
