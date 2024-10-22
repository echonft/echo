import type { NonceResponse } from '@echo/api/types/responses/nonce-response'
import { errorStore } from '@echo/storybook/mocks/stores/error-store'
import { toPromise } from '@echo/utils/fp/to-promise'
import { toRejectedPromise } from '@echo/utils/fp/to-rejected-promise'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import { objOf, pipe } from 'ramda'

export function getNonce(): Promise<NonceResponse> {
  const error = errorStore.getState().getNonceError
  if (error) {
    return pipe(toRejectedPromise, delayPromise(800))()
  }
  return pipe(objOf('nonce'), toPromise, delayPromise(800))('nonce')
}
