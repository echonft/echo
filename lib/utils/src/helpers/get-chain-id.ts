import { CHAIN_ID } from '@echo/utils/constants/chains/chain-ids'
import type { ChainName } from '@echo/utils/types/chain-name'

export function getChainId(chain: ChainName): number {
  return CHAIN_ID[chain]
}
