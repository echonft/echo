import { Chain, chains } from '@echo/model/constants/chain'
import type { ChainProps } from '@echo/model/types/chain'
import { Network, network } from '@echo/utils/constants/network'
import { both, filter, map, type NonEmptyArray, pipe, prop, propEq, values } from 'ramda'

export function supportedChains() {
  return pipe(
    values,
    filter(
      both<[ChainProps]>(
        propEq<Network, 'network'>(network(), 'network'),
        propEq<boolean, 'supported'>(true, 'supported')
      )
    ),
    map(prop('name'))
  )(chains) as NonEmptyArray<Chain>
}
