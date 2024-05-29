import type { ChainName } from '@echo/utils/types/chain-name'
import type { HexString } from '@echo/utils/types/hex-string'
import { formatAddress } from '@echo/web3/helpers/format-address'
import { getEchoAddressByChain } from '@echo/web3/helpers/get-echo-address-by-chain'

export function isEcho(address: HexString, chain: ChainName): boolean {
  return getEchoAddressByChain(chain) == formatAddress(address)
}
