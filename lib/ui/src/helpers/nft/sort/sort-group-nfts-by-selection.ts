import type { Nft } from '@echo/model/types/nft'
import type { Slug } from '@echo/model/types/slug'
import type { NftGroup } from '@echo/ui/types/nft-group'
import { isIn } from '@echo/utils/fp/is-in'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import {
  always,
  ascend,
  findIndex,
  gt,
  identity,
  ifElse,
  isEmpty,
  map,
  path,
  pipe,
  prop,
  sortBy,
  sortWith,
  uniq
} from 'ramda'

export function sortGroupNftsBySelection(nftGroups: NftGroup[], selection: Nft[]): NftGroup[] {
  // If no selections we're made, simply return the groups sorted by id (slug)
  if (isEmpty(selection)) {
    return sortBy(prop('id'))(nftGroups)
  }

  // Otherwise we check the unique ids we have selected and prioritize the groups selected
  const selectionIds = pipe<[Nft[]], Slug[], Slug[]>(
    map(nonNullableReturn(path(['collection', 'slug']))),
    uniq
  )(selection)

  return sortWith<NftGroup>([
    ascend(pipe(prop('id'), findIndex(isIn(selectionIds)), ifElse(gt(0), always(selection.length), identity))),
    ascend(prop('id'))
  ])(nftGroups)
}
