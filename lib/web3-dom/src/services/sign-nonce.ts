import type { Address } from '@echo/model/types/address'
import { hostname } from '@echo/routing/constants/hostname'
import type { HexString } from '@echo/utils/types/hex-string'
import { wagmiConfig } from '@echo/web3-dom/constants/wagmi-config'
import { formatAddress } from '@echo/web3-dom/helpers/format-address'
import { SiweMessage } from 'siwe'
import { sei } from 'viem/chains'
import { signMessage } from 'wagmi/actions'

export interface SignNonceArgs {
  address: Address
  nonce: string
}

export interface SignNonceResult {
  message: string
  signature: HexString
}

export async function signNonce({ address, nonce }: SignNonceArgs): Promise<SignNonceResult> {
  const siweMessage = new SiweMessage({
    address: formatAddress(address),
    domain: hostname(),
    nonce,
    scheme: 'https',
    statement: 'Sign this message to add your wallet to Echo',
    version: '1',
    chainId: sei.id,
    uri: `https://${hostname()}`
  })
  const message = siweMessage.prepareMessage()
  const signature = await signMessage(wagmiConfig, { message })
  return { message, signature }
}
