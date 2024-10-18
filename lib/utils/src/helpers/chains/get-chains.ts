import { Chain } from '@echo/utils/constants/chain'
import type { NonEmptyArray } from 'ramda'

export function getChains(): NonEmptyArray<Chain> {
  return [Chain.BlastSepolia, Chain.Sepolia, Chain.Blast, Chain.Ethereum, Chain.Sei] as const
}
