import { walletSchema } from '@server/validators/wallet-schema'
import { z } from 'zod'

export const removeWalletSchema = z.object({
  wallet: walletSchema
})
