import { walletSchema } from '@echo/utils/validators/wallet-schema'
import { z } from 'zod'

export const removeWalletSchema = z.object({
  wallet: walletSchema
})
