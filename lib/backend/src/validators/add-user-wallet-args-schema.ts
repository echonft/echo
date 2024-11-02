import { WalletError } from '@echo/model/constants/errors/wallet-error'
import { chainById } from '@echo/model/helpers/chain/chain-by-id'
import { chainId } from '@echo/model/helpers/chain/chain-id'
import { walletFromContract } from '@echo/model/helpers/wallet/wallet-from-contract'
import { base64DecodeSchema } from '@echo/model/validators/base64-decode-schema'
import { contractSchema } from '@echo/model/validators/contract-schema'
import type { HexString } from '@echo/utils/types/hex-string'
import { modify, toLower } from 'ramda'
import { SiweMessage } from 'siwe'
import { NEVER, string, ZodIssueCode } from 'zod'

export const addUserWalletArgsSchema = contractSchema
  .extend({
    nonce: string().min(1),
    signature: base64DecodeSchema,
    message: base64DecodeSchema
  })
  .transform((params) => {
    return modify('message', (message) => new SiweMessage(message), params)
  })
  .transform(async ({ address, chain, message, nonce, signature }, ctx) => {
    try {
      const { data } = await message.verify({
        scheme: message.scheme,
        signature,
        domain: message.domain,
        nonce: message.nonce
      })
      if (data.nonce !== nonce || toLower(data.address) !== toLower(address) || data.chainId !== chainId(chain)) {
        ctx.addIssue({
          code: ZodIssueCode.custom,
          message: WalletError.SignatureInvalid
        })
        return NEVER
      }
      return walletFromContract({ address: toLower(data.address as HexString), chain: chainById(data.chainId) })
    } catch (_err) {
      ctx.addIssue({
        code: ZodIssueCode.custom,
        message: WalletError.SignatureInvalid
      })
      return NEVER
    }
  })
