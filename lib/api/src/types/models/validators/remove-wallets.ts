import { wallet } from './wallet'
import { z } from 'zod'

export const removeWalletsSchema = z.object({
  wallet: wallet.array().nonempty()
})
