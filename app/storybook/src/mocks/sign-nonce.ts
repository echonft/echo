import type { SignNonceResult } from '@echo/web3-dom/services/sign-nonce'
import { rangeDelay } from 'delay'

export function signNonce(): Promise<SignNonceResult> {
  return rangeDelay(800, 1600, {
    value: { message: 'message', signature: '0xaF1c962f799954E2a43fFdEA5Acaa942d53E1F84' }
  })
}
