import { walletSchema } from '@echo/frontend/lib/validators/wallet-schema'
import { z } from 'zod'

export const removeWalletSchema = z.object({
  wallet: walletSchema
})
