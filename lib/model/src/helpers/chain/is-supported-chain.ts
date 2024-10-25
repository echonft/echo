import { type Chain, chains } from '@echo/model/constants/chain'
import { path } from 'ramda'

export function isSupportedChain(chain: Chain): boolean {
  return path([chain, 'supported'], chains)
}
