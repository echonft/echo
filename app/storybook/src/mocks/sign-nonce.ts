import { errorStore } from '@echo/storybook/mocks/stores/error-store'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import type { SignNonceArgs } from '@echo/web3/types/sign-nonce-args'
import type { SignNonceResult } from '@echo/web3/types/sign-nonce-result'

export function signNonce(_args: SignNonceArgs): Promise<SignNonceResult> {
  const error = errorStore.getState().signNonceError
  if (error) {
    return delayPromise(Promise.reject(), 800)
  }
  return delayPromise(
    Promise.resolve({ message: 'message', signature: '0xaF1c962f799954E2a43fFdEA5Acaa942d53E1F84' }),
    800
  )
}
