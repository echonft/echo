import { type Chain, chains } from '@echo/model/constants/chain'
import type { VirtualMachine } from '@echo/model/constants/virtual-machine'
import type { ChainProps } from '@echo/model/types/chain'
import { network, Network } from '@echo/utils/constants/network'
import { both, filter, map, type NonEmptyArray, pipe, prop, propEq, values } from 'ramda'

export function chainsForVirtualMachine(vm: VirtualMachine): NonEmptyArray<Chain> {
  // FIXME Typing is broken here
  return pipe(
    values,
    filter(prop('supported')),
    filter(
      both<[ChainProps]>(propEq<Network, 'network'>(network(), 'network'), propEq<VirtualMachine, 'vm'>(vm, 'vm'))
    ),
    map(prop('name'))
  )(chains) as NonEmptyArray<Chain>
}
