import type { Nft } from '@echo/model/types/nft'
import type { CollectionFilter } from '@echo/ui/types/collection-filter'
import type { Nullable } from '@echo/utils/types/nullable'
import { equals, isNil, pipe, prop, propSatisfies } from 'ramda'

export function getByCollectionNftFilter<T extends Nft, U extends CollectionFilter>(
  filter: Nullable<U>
): Nullable<(nft: T) => boolean> {
  if (isNil(filter)) {
    return undefined
  }
  return propSatisfies(pipe(prop('slug'), equals(filter.id)), 'collection')
}
