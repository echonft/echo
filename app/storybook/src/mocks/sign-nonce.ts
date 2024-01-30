import { delayPromise } from '@echo/utils/helpers/delay-promise'
import type { SignNonceArgs } from '@echo/web3/types/sign-nonce-args'
import type { SignNonceResult } from '@echo/web3/types/sign-nonce-result'

export function signNonce(_args: SignNonceArgs): Promise<SignNonceResult> {
  return delayPromise(
    Promise.resolve({ message: 'message', signature: '0xaF1c962f799954E2a43fFdEA5Acaa942d53E1F84' }),
    1200
  )
}
