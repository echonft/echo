import type { Chain } from '@echo/model/constants/chain'
import { chainId } from '@echo/model/helpers/chain/chain-id'
import type { EvmAddress } from '@echo/model/types/address'
import { hostname } from '@echo/routing/constants/hostname'
import type { HexString } from '@echo/utils/types/hex-string'
import { wagmiConfig } from '@echo/web3-dom/constants/wagmi-config'
import { SiweMessage } from 'siwe'
import { getAddress } from 'viem'
import { signMessage } from 'wagmi/actions'

export interface SignNonceArgs {
  address: EvmAddress
  chain: Chain
  nonce: string
}

export interface SignNonceResult {
  message: string
  signature: HexString
}

export async function signNonce({ address, chain, nonce }: SignNonceArgs): Promise<SignNonceResult> {
  const siweMessage = new SiweMessage({
    address: getAddress(address),
    chainId: chainId(chain),
    domain: hostname,
    nonce,
    scheme: 'https',
    statement: 'Sign this message to add your wallet to Echo',
    version: '1',
    uri: `https://${hostname}`
  })
  const message = siweMessage.prepareMessage()
  const signature = await signMessage(wagmiConfig, { message })
  return { message, signature }
}
