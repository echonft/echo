import { WalletError } from '@echo/model/constants/errors/wallet-error'
import type { Address } from '@echo/model/types/address'
import type { ChainId } from '@echo/model/types/chain'
import { base64DecodeSchema } from '@echo/model/validators/base64-decode-schema'
import { hexStringSchema } from '@echo/model/validators/hex-string-schema'
import { modify, toLower } from 'ramda'
import { SiweMessage } from 'siwe'
import { NEVER, object, string, ZodIssueCode } from 'zod'

export const credentialsSchema = object({
  signature: hexStringSchema,
  message: base64DecodeSchema,
  csrfToken: string().min(1)
})
  .transform((params) => {
    return modify('message', (message) => new SiweMessage(message), params)
  })
  .transform(async (params, ctx) => {
    const { message, signature, csrfToken } = params
    try {
      const {
        data: { address, chainId, nonce }
      } = await message.verify({
        scheme: message.scheme,
        signature,
        domain: message.domain,
        nonce: message.nonce
      })
      if (nonce !== csrfToken) {
        ctx.addIssue({
          code: ZodIssueCode.custom,
          message: WalletError.SignatureInvalid
        })
        return NEVER
      }
      return { address: toLower(address), chainId } as { address: Address; chainId: ChainId }
    } catch (_err) {
      ctx.addIssue({
        code: ZodIssueCode.custom,
        message: WalletError.SignatureInvalid
      })
      return NEVER
    }
  })
