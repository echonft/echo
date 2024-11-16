import { delayPromise } from '@echo/utils/helpers/delay-promise'
import { toPromise } from '@echo/utils/helpers/to-promise'
import type { SignNonceResult } from '@echo/web3-dom/services/sign-nonce'
import { pipe } from 'ramda'

export function signNonce(): Promise<SignNonceResult> {
  return pipe(
    toPromise,
    delayPromise(800)
  )({ message: 'message', signature: '0xaF1c962f799954E2a43fFdEA5Acaa942d53E1F84' })
}
