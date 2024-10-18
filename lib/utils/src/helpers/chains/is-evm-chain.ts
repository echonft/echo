import { Chain } from '@echo/utils/constants/chain'
import { isIn } from '@echo/utils/fp/is-in'

export function isEvmChain(chain: Chain) {
  return isIn([Chain.Blast, Chain.BlastSepolia, Chain.Ethereum, Chain.Sepolia, Chain.Sei], chain)
}
