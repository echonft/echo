import { signMessage } from '@wagmi/core'
import { assoc, pipe } from 'ramda'
import { SiweMessage } from 'siwe'

export interface SignNonceArgs {
  domain: string
  address: string
  uri: string
  chainId: number
  nonce: string
}
export async function signNonce(args: SignNonceArgs) {
  const siweMessage = new SiweMessage(
    pipe(assoc('statement', 'Sign this message to add your wallet to Echo'), assoc('version', '1'))(args)
  )
  return await signMessage({ message: siweMessage.prepareMessage() })
}
