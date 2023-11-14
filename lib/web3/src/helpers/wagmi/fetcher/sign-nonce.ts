import type { Wallet } from '@echo/model/types/wallet'
import type { HexString } from '@echo/utils/types/hex-string'
import { getNonceSiweMessageParams } from '@echo/web3/helpers/wagmi/fetcher/get-nonce-siwe-message-params'
import { signMessage } from '@wagmi/core'
import { SiweMessage } from 'siwe'

export interface SignNonceArgs {
  domain: string
  uri: string
  nonce: string
  wallet: Wallet
}
export interface SignNonceResult {
  message: string
  signature: HexString
}
export async function signNonce(args: SignNonceArgs): Promise<SignNonceResult> {
  const siweMessage = new SiweMessage(getNonceSiweMessageParams(args))
  const message = siweMessage.prepareMessage()
  const signature = await signMessage({ message })
  return { message, signature }
}
