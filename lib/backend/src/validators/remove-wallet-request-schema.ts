import { walletSchema } from '@echo/model/validators/wallet-schema'
import { object } from 'zod'

export const removeWalletRequestSchema = object({
  wallet: walletSchema
})
