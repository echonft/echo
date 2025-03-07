import type { Nft, NftAttribute } from '@echo/model/types/nft'
import type { TraitFilter } from '@echo/ui/types/trait-filter'
import { intersects } from '@echo/utils/helpers/intersects'
import type { Nullable } from '@echo/utils/types/nullable'
import { isEmpty, map, pipe, prop } from 'ramda'

export function getByTraitsNftFilterPredicate(filters: TraitFilter[]): Nullable<(nft: Nft) => boolean> {
  if (isEmpty(filters)) {
    return undefined
  }
  const attributes = map(prop('attribute'), filters)
  return pipe<[Nft], NftAttribute[], boolean>(prop('attributes'), intersects(attributes))
}
