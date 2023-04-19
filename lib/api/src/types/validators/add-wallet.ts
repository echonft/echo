import { signature } from './signature'
import { wallet } from './wallet'
import { SiweMessage } from 'siwe'
import { z } from 'zod'

export const addWalletSchema = z.object({
  wallet: wallet.required(),
  signature: signature,
  message: z.instanceof(SiweMessage)
})
