import type { NonceResponse } from '@echo/api/types/responses/nonce-response'
import { errorStore } from '@echo/storybook/mocks/stores/error-store'
import { delayPromise } from '@echo/utils/helpers/delay-promise'

export function getNonce(): Promise<NonceResponse> {
  const error = errorStore.getState().getNonceError
  if (error) {
    return delayPromise(Promise.reject(), 800)
  }
  return delayPromise(Promise.resolve({ nonce: 'nonce' }), 800)
}
