import { hexStringSchema } from '@echo/utils/validators/hex-string-schema'
import { walletSchema } from '@echo/utils/validators/wallet-schema'
import { z } from 'zod'

export const addWalletSchema = z.object({
  wallet: walletSchema,
  signature: hexStringSchema,
  message: z.string().min(1)
})
