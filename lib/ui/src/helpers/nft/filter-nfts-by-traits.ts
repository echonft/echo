import type { Nft } from '@echo/model/types/nft'
import type { NftAttribute } from '@echo/model/types/nft-attribute'
import { isSelected } from '@echo/ui/helpers/selectable/is-selected'
import type { Selectable } from '@echo/ui/types/selectable'
import type { TraitFilter } from '@echo/ui/types/trait-filter'
import type { TraitFilterGroup } from '@echo/ui/types/trait-filter-group'
import { intersects } from '@echo/utils/fp/intersects'
import { isNonEmptyArray } from '@echo/utils/fp/is-non-empty-array'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'
import { drop, filter, flatten, head, intersection, isEmpty, map, pipe, prop, reject } from 'ramda'

function recursiveIntersection<T>(list: T[][], intersectionList: T[]) {
  if (isNonEmptyArray(list)) {
    const first = head(list)
    return recursiveIntersection(drop(1, list), intersection(first, intersectionList))
  }
  return intersectionList
}
export function filterNftsByTraits<T extends Nft>(filterGroups: TraitFilterGroup[], nfts: T[]): T[] {
  function getNftsFromFilters(filters: TraitFilter[]) {
    const attributes = map<TraitFilter, NftAttribute>(prop('attribute'), filters)
    return filter(pipe<[T], NftAttribute[], boolean>(prop('attributes'), intersects(attributes)), nfts)
  }
  const selectedFilters = pipe(
    map(
      pipe<[TraitFilterGroup], Selectable<TraitFilter>[], Selectable<TraitFilter>[]>(
        prop('filters'),
        filter(isSelected<TraitFilter>)
      )
    ),
    reject(isEmpty)
  )(filterGroups)
  if (pipe(flatten, isEmpty)(selectedFilters)) {
    return nfts
  }
  const filteredNfts = map(pipe(getNftsFromFilters), selectedFilters) as NonEmptyArray<T[]>
  return recursiveIntersection<T>(drop(1, filteredNfts), head(filteredNfts))
}
