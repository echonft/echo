import { getChainId } from '@echo/utils/helpers/chains/get-chain-id'
import { getSupportedChains } from '@echo/utils/helpers/chains/get-supported-chains'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'
import { getChainById } from '@echo/web3/helpers/get-chain-by-id'
import { map, pipe } from 'ramda'
import type { Chain } from 'viem'

export function getChains() {
  return pipe(getSupportedChains, map(pipe(getChainId, getChainById)))() as NonEmptyArray<Chain>
}
