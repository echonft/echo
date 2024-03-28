import type { Nft } from '@echo/model/types/nft'
import type { NftAttribute } from '@echo/model/types/nft-attribute'
import type { TraitFilter } from '@echo/ui/types/trait-filter'
import { intersects } from '@echo/utils/fp/intersects'
import { filter, identity, isEmpty, map, pipe, prop } from 'ramda'

export function filterNftsByTraits<T extends Nft>(filters: TraitFilter[]): (nfts: T[]) => T[] {
  if (isEmpty(filters)) {
    return identity<T[]>
  }
  const attributes = map<TraitFilter, NftAttribute>(prop('attribute'), filters)
  return filter(pipe<[T], NftAttribute[], boolean>(prop('attributes'), intersects(attributes)))
}
