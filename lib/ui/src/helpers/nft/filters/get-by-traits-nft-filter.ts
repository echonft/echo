import type { Nft } from '@echo/model/types/nft'
import type { NftAttribute } from '@echo/model/types/nft-attribute'
import type { TraitFilter } from '@echo/ui/types/trait-filter'
import { intersects } from '@echo/utils/fp/intersects'
import type { Nullable } from '@echo/utils/types/nullable'
import { isEmpty, map, pipe, prop } from 'ramda'

export function getByTraitsNftFilter<T extends Nft, U extends TraitFilter>(
  filters: U[]
): Nullable<(nft: T) => boolean> {
  if (isEmpty(filters)) {
    return undefined
  }
  const attributes = map<U, NftAttribute>(prop('attribute'), filters)
  return pipe<[T], NftAttribute[], boolean>(prop('attributes'), intersects(attributes))
}
