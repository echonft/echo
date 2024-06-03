import { hexStringSchema } from '@echo/utils/validators/hex-string-schema'
import { walletSchema } from '@echo/utils/validators/wallet-schema'
import { object, string } from 'zod'

export const addWalletSchema = object({
  wallet: walletSchema,
  signature: hexStringSchema,
  message: string().min(1)
})
