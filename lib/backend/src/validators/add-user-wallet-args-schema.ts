import { WalletError } from '@echo/model/constants/errors/wallet-error'
import { addressSchema } from '@echo/model/validators/address-schema'
import { base64DecodeSchema } from '@echo/model/validators/base64-decode-schema'
import type { HexString } from '@echo/utils/types/hex-string'
import { modify, toLower } from 'ramda'
import { SiweMessage } from 'siwe'
import { NEVER, object, string, ZodIssueCode } from 'zod'

export const addUserWalletArgsSchema = object({
  address: addressSchema,
  nonce: string().min(1),
  signature: base64DecodeSchema,
  message: base64DecodeSchema
})
  .transform((params) => {
    return modify('message', (message) => new SiweMessage(message), params)
  })
  .transform(async ({ address, message, nonce, signature }, ctx) => {
    try {
      const { data } = await message.verify({
        scheme: message.scheme,
        signature,
        domain: message.domain,
        nonce: message.nonce
      })
      if (data.nonce !== nonce || toLower(data.address) !== toLower(address)) {
        ctx.addIssue({
          code: ZodIssueCode.custom,
          message: WalletError.SignatureInvalid
        })
        return NEVER
      }
      return toLower(data.address as HexString)
    } catch (_err) {
      ctx.addIssue({
        code: ZodIssueCode.custom,
        message: WalletError.SignatureInvalid
      })
      return NEVER
    }
  })
