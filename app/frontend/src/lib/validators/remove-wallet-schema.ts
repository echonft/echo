import { walletSchema } from '@echo/utils/validators/wallet-schema'
import { object } from 'zod'

export const removeWalletSchema = object({
  wallet: walletSchema
})
