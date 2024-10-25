import { Chain, chains } from '@echo/model/constants/chain'
import { VirtualMachine } from '@echo/model/constants/virtual-machine'
import { pathEq } from 'ramda'

export function isEvmChain(chain: Chain) {
  return pathEq(VirtualMachine.Evm, [chain, 'vm'], chains)
}
