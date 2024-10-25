import { Chain, chains } from '@echo/model/constants/chain'
import { Network } from '@echo/utils/constants/network'
import { pathEq } from 'ramda'

export function isTestnetChain(chain: Chain): boolean {
  return pathEq(Network.Testnet, [chain, 'network'], chains)
}
