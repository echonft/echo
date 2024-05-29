import type { ChainName } from '@echo/utils/types/chain-name'
import type { HexString } from '@echo/utils/types/hex-string'
import { ECHO_ADDRESS } from '@echo/web3/constants/echo-address'
import { isNil } from 'ramda'

export function getEchoAddressByChain(chain: ChainName): HexString {
  const address = ECHO_ADDRESS[chain]
  if (isNil(address)) {
    throw Error(`unsupported chain: ${chain}`)
  }
  return address
}
