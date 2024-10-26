import { addWalletRequestSchema } from '@echo/api/validators/add-wallet-request-schema'
import { ForbiddenError } from '@echo/backend/errors/forbidden-error'
import { getNonceForUser } from '@echo/firestore/crud/nonce/get-nonce-for-user'
import { getUserByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import { chains } from '@echo/model/constants/chain'
import { UserError } from '@echo/model/constants/errors/user-error'
import { WalletError } from '@echo/model/constants/errors/wallet-error'
import type { Username } from '@echo/model/types/username'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { dateNumberIsPast } from '@echo/utils/helpers/date-number-is-past'
import { assoc, isNil, modify, path, pick, pipe, toLower } from 'ramda'
import { SiweMessage } from 'siwe'
import { NEVER, ZodIssueCode } from 'zod'

export function addWalletRequestTransformSchema(username: Username) {
  return addWalletRequestSchema
    .transform((request) => {
      return modify('message', (message) => new SiweMessage(message), request)
    })
    .transform(async (params, ctx) => {
      try {
        const { data, success } = await params.message.verify({
          signature: params.signature,
          domain: params.message.domain,
          nonce: params.message.nonce
        })
        if (!success) {
          ctx.addIssue({
            code: ZodIssueCode.custom,
            message: WalletError.SignatureInvalid
          })
          return NEVER
        }
        return pipe(pick(['address', 'chain']), assoc('nonce', data.nonce))(params)
      } catch (_err) {
        ctx.addIssue({
          code: ZodIssueCode.custom,
          message: WalletError.SignatureInvalid
        })
        return NEVER
      }
    })
    .transform(async ({ address, chain, nonce }, ctx) => {
      const foundUser = await getUserByUsername(username)
      if (isNil(foundUser)) {
        ctx.addIssue({
          code: ZodIssueCode.custom,
          message: UserError.NotFound
        })
        return NEVER
      }
      const foundNonce = await getNonceForUser(foundUser.username)
      if (isNilOrEmpty(foundNonce)) {
        return Promise.reject(new ForbiddenError({ message: WalletError.NonceNotFound }))
      }
      if (dateNumberIsPast(foundNonce.expiresAt)) {
        return Promise.reject(new ForbiddenError({ message: WalletError.NonceExpired }))
      }
      if (foundNonce.nonce !== nonce) {
        return Promise.reject(new ForbiddenError({ message: WalletError.NonceInvalid }))
      }
      return { address: toLower(address), vm: path([chain, 'vm'], chains) }
    })
}
