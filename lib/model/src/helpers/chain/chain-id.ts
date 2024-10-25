import { Chain, chains } from '@echo/model/constants/chain'
import type { ChainId } from '@echo/model/types/chain'
import { path } from 'ramda'

export function chainId(chain: Chain): ChainId {
  return path([chain, 'id'], chains)
}
