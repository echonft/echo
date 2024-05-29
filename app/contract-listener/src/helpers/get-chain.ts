import { SUPPORTED_CHAINS } from '@echo/utils/constants/chains/supported-chains'
import type { ChainName } from '@echo/utils/types/chain-name'
import { head } from 'ramda'

// FIXME This won't work on multichain. Will work for now since its only on one chain
export function getChain(): ChainName {
  return head(SUPPORTED_CHAINS)
}
