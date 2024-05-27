import { getChainName } from '@echo/utils/helpers/get-chain-name'
import { CHAINS } from '@echo/web3/constants/chains'
import { isNil } from 'ramda'
import type { Chain } from 'viem'

export function getChainById(chainId: number): Chain {
  const chainName = getChainName(chainId)
  if (isNil(chainName)) {
    throw Error(`unsupported chainId: ${chainId}`)
  }
  const chain = CHAINS[chainName]
  if (isNil(chainName)) {
    throw Error(`unsupported chainId: ${chainId}`)
  }
  return chain
}
