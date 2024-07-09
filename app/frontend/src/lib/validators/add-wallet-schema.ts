import { hexStringSchema } from '@echo/utils/validators/hex-string-schema'
import { walletSchema } from '@echo/utils/validators/wallet-schema'
import { SiweMessage } from 'siwe'
import { NEVER, object, string, ZodIssueCode } from 'zod'

export const addWalletSchema = object({
  wallet: walletSchema,
  signature: hexStringSchema,
  message: string()
    .min(1)
    .transform((message) => new SiweMessage(message))
}).transform(async (params, ctx) => {
  const { data, success } = await params.message.verify({
    signature: params.signature,
    domain: params.message.domain,
    nonce: params.message.nonce
  })
  if (!success) {
    ctx.addIssue({
      code: ZodIssueCode.custom,
      message: 'Invalid signature'
    })
    return NEVER
  }
  return { wallet: params.wallet, nonce: data.nonce }
})
