import { Chain, chains } from '@echo/model/constants/chain'
import { ChainError } from '@echo/model/constants/errors/chain-error'
import type { ChainId, ChainProps } from '@echo/model/types/chain'
import { find, isNil, pipe, propEq, values } from 'ramda'

export function chainById(id: ChainId): Chain {
  const chain = pipe(values, find<ChainProps>(propEq(id, 'id')))(chains)
  if (isNil(chain)) {
    throw Error(ChainError.Unsupported)
  }
  return chain.name
}
