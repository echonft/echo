import { Chain, chains } from '@echo/model/constants/chain'
import type { VirtualMachine } from '@echo/model/constants/virtual-machine'
import { path } from 'ramda'

export function chainVirtualMachine(chain: Chain): VirtualMachine {
  return path([chain, 'vm'], chains)
}
