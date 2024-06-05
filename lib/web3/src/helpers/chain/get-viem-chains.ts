import { getChainId } from '@echo/utils/helpers/chains/get-chain-id'
import { getSupportedChains } from '@echo/utils/helpers/chains/get-supported-chains'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'
import { getViemChainById } from '@echo/web3/helpers/chain/get-viem-chain-by-id'
import { map, pipe } from 'ramda'
import type { Chain } from 'viem'

export function getViemChains() {
  return pipe(getSupportedChains, map(pipe(getChainId, getViemChainById)))() as NonEmptyArray<Chain>
}
