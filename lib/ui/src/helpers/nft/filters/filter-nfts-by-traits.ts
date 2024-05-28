import type { Nft } from '@echo/model/types/nft'
import type { NftAttribute } from '@echo/model/types/nft-attribute'
import { isSelected } from '@echo/ui/helpers/selectable/is-selected'
import type { TraitFilter } from '@echo/ui/types/trait-filter'
import { intersects } from '@echo/utils/fp/intersects'
import { filter, map, pipe, prop } from 'ramda'

function getNftsFromFilters<T extends Nft, U extends TraitFilter>(nfts: T[]): (filters: U[]) => T[] {
  return function (filters: U[]) {
    const attributes = map<U, NftAttribute>(prop('attribute'), filters)
    return filter(pipe<[T], NftAttribute[], boolean>(prop('attributes'), intersects(attributes)), nfts)
  }
}

export function filterNftsByTraits<T extends Nft, U extends TraitFilter>(filters: U[]): (nfts: T[]) => T[] {
  return function (nfts: T[]): T[] {
    return pipe<[U[]], U[], T[]>(filter(isSelected<U>), getNftsFromFilters<T, U>(nfts))(filters)
  }
}
