import type { Nft } from '@echo/model/types/nft'
import type { CollectionFilter } from '@echo/ui/types/collection-filter'
import { equals, pipe, prop, propSatisfies } from 'ramda'

export function getByCollectionNftFilterPredicate(filter: CollectionFilter): (nft: Nft) => boolean {
  return propSatisfies(pipe(prop('slug'), equals(filter.id)), 'collection')
}
