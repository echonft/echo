import type { Chain } from '@echo/model/constants/chain'
import { chainId } from '@echo/model/helpers/chain/chain-id'
import type { EvmAddress } from '@echo/model/types/address'
import type { HexString } from '@echo/utils/types/hex-string'
import { wagmiConfig } from '@echo/web3-dom/constants/wagmi-config'
import { always, applySpec, pipe, prop } from 'ramda'
import { SiweMessage } from 'siwe'
import { getAddress } from 'viem'
import { signMessage } from 'wagmi/actions'

export interface SignNonceArgs {
  address: EvmAddress
  chain: Chain
  domain: string
  nonce: string
  uri: string
}

export function getNonceSiweMessageParams(args: SignNonceArgs): Partial<SiweMessage> {
  return applySpec<Partial<SiweMessage>>({
    address: pipe(prop('address'), getAddress),
    chainId: pipe(prop('chain'), chainId),
    domain: prop('domain'),
    nonce: prop('nonce'),
    statement: always('Sign this message to add your wallet to Echo'),
    version: always('1'),
    uri: prop('uri')
  })(args)
}

export interface SignNonceResult {
  message: string
  signature: HexString
}

export async function signNonce(args: SignNonceArgs): Promise<SignNonceResult> {
  const siweMessage = new SiweMessage(getNonceSiweMessageParams(args))
  const message = siweMessage.prepareMessage()
  const signature = await signMessage(wagmiConfig, { message })
  return { message, signature }
}
