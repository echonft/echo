import { wallet } from './wallet'
import { z } from 'zod'

export const removeWalletSchema = z.object({
  wallet: wallet.required()
})
