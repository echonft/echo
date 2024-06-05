import type { ChainName } from '@echo/utils/types/chain-name'
import type { HexString } from '@echo/utils/types/hex-string'
import { getEchoAddressByChain } from '@echo/web3/helpers/get-echo-address-by-chain'
import { equals } from 'ramda'

export function isEcho(address: HexString, chain: ChainName): boolean {
  return equals(address, getEchoAddressByChain(chain))
}
