import type { NonceResponse } from '@echo/api/types/responses/nonce-response'
import { delayPromise } from '@echo/utils/helpers/delay-promise'

export function getNonce(): Promise<NonceResponse> {
  return delayPromise(Promise.resolve({ nonce: 'nonce' }), 1200)
}
