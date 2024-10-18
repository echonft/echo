import { Chain } from '@echo/utils/constants/chain'
import { isTestnet } from '@echo/utils/constants/is-testnet'
import { type NonEmptyArray } from 'ramda'

export function getSupportedChains() {
  if (isTestnet) {
    return [Chain.BlastSepolia, Chain.Sepolia] as NonEmptyArray<Chain>
  }
  return [Chain.Sei] as NonEmptyArray<Chain>
}
