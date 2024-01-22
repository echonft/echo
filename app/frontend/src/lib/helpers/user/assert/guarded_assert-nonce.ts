import type { Nonce } from '@echo/firestore/types/model/nonce/nonce'
import { ForbiddenError } from '@echo/frontend/lib/helpers/error/forbidden-error'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import type { SiweMessage } from 'siwe'

export function guarded_assertNonce(nonce: Nonce | undefined, verifiedMessage: SiweMessage) {
  if (
    isNilOrEmpty(nonce) ||
    nonce.expired ||
    isNilOrEmpty(verifiedMessage.nonce) ||
    verifiedMessage.nonce !== nonce.nonce
  ) {
    throw new ForbiddenError()
  }
}
