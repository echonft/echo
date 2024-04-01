import type { Nonce } from '@echo/firestore/types/model/nonce/nonce'
import { ForbiddenError } from '@echo/frontend/lib/helpers/error/forbidden-error'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import type { Nullable } from '@echo/utils/types/nullable'
import type { SiweMessage } from 'siwe'

export function assertNonce(nonce: Nullable<Nonce>, verifiedMessage: SiweMessage) {
  if (
    isNilOrEmpty(nonce) ||
    nonce.expired ||
    isNilOrEmpty(verifiedMessage.nonce) ||
    verifiedMessage.nonce !== nonce.nonce
  ) {
    throw new ForbiddenError()
  }
}
