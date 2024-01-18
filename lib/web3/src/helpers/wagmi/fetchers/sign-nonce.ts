import { getNonceSiweMessageParams } from '@echo/web3/helpers/wagmi/fetchers/get-nonce-siwe-message-params'
import type { SignNonceArgs } from '@echo/web3/types/sign-nonce-args'
import type { SignNonceResult } from '@echo/web3/types/sign-nonce-result'
import { signMessage } from '@wagmi/core'
import { SiweMessage } from 'siwe'

export async function signNonce(args: SignNonceArgs): Promise<SignNonceResult> {
  const siweMessage = new SiweMessage(getNonceSiweMessageParams(args))
  const message = siweMessage.prepareMessage()
  const signature = await signMessage({ message })
  return { message, signature }
}
