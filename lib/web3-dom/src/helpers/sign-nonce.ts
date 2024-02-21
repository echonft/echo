import { wagmiConfig } from '@echo/web3-dom/constants/wagmi-config'
import { getNonceSiweMessageParams } from '@echo/web3-dom/helpers/get-nonce-siwe-message-params'
import type { SignNonceArgs } from '@echo/web3-dom/types/sign-nonce-args'
import type { SignNonceResult } from '@echo/web3-dom/types/sign-nonce-result'
import { SiweMessage } from 'siwe'
import { signMessage } from 'wagmi/actions'

export async function signNonce(args: SignNonceArgs): Promise<SignNonceResult> {
  const siweMessage = new SiweMessage(getNonceSiweMessageParams(args))
  const message = siweMessage.prepareMessage()
  const signature = await signMessage(wagmiConfig, { message })
  return { message, signature }
}
