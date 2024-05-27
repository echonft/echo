import { SUPPORTED_CHAINS } from '@echo/utils/constants/chains/supported-chains'
import { getChainId } from '@echo/utils/helpers/get-chain-id'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'
import { getChainById } from '@echo/web3/helpers/get-chain-by-id'
import { map, pipe } from 'ramda'
import type { Chain } from 'viem'

export function getChains() {
  return map(pipe(getChainId, getChainById), SUPPORTED_CHAINS) as NonEmptyArray<Chain>
}
