import type { NonceResponse } from '@echo/api/types/responses/nonce-response'
import { errorStore } from '@echo/storybook/mocks/stores/error-store'
import { toPromise } from '@echo/utils/fp/to-promise'
import { toRejectedPromise } from '@echo/utils/fp/to-rejected-promise'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import { applySpec, identity, pipe } from 'ramda'

export function getNonce(): Promise<NonceResponse> {
  const error = errorStore.getState().getNonceError
  if (error) {
    return delayPromise(toRejectedPromise, 800)()
  }
  return delayPromise(pipe(applySpec<NonceResponse>({ nonce: identity }), toPromise), 800)('nonce')
}
