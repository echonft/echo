import { walletSchema } from '@echo/frontend/lib/server/validators/wallet-schema'
import { z } from 'zod'

export const removeWalletSchema = z.object({
  wallet: walletSchema
})
