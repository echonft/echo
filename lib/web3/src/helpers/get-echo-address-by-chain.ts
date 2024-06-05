import type { ChainName } from '@echo/utils/types/chain-name'
import type { HexString } from '@echo/utils/types/hex-string'
import { echoAddress } from '@echo/web3/constants/echo-address'
import { isNil, toLower } from 'ramda'

export function getEchoAddressByChain(chain: ChainName): Lowercase<HexString> {
  const address = echoAddress[chain]
  if (isNil(address)) {
    throw Error(`unsupported chain: ${chain}`)
  }
  return toLower(address)
}
