import { addWalletRequestSchema } from '@echo/api/validators/add-wallet-request-schema'
import { ForbiddenError } from '@echo/backend/errors/forbidden-error'
import { getNonceForUser } from '@echo/firestore/crud/nonce/get-nonce-for-user'
import { getUserByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import { chains } from '@echo/model/constants/chain'
import { UserError } from '@echo/model/constants/errors/user-error'
import type { Username } from '@echo/model/types/username'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { assoc, isNil, modify, path, pick, pipe } from 'ramda'
import { SiweMessage } from 'siwe'
import { NEVER, ZodIssueCode } from 'zod'

export function addWalletRequestTransformSchema(username: Username) {
  return addWalletRequestSchema
    .transform((request) => {
      return modify('message', (message) => new SiweMessage(message), request)
    })
    .transform(async (params, ctx) => {
      const { data, success } = await params.message.verify({
        signature: params.signature,
        domain: params.message.domain,
        nonce: params.message.nonce
      })
      if (!success) {
        ctx.addIssue({
          code: ZodIssueCode.custom,
          message: 'invalid signature'
        })
        return NEVER
      }
      return pipe(pick(['address', 'chain']), assoc('nonce', data.nonce))(params)
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
      if (isNilOrEmpty(foundNonce) || foundNonce.expired || foundNonce.nonce !== nonce) {
        return Promise.reject(new ForbiddenError())
      }
      return { address, vm: path([chain, 'vm'], chains) }
    })
}
