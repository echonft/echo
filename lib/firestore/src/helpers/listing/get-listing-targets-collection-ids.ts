import { ListingTarget } from '@echo/firestore-types'
import pathIsNil from '@echo/utils/path-is-nil'
import propIsNil from '@echo/utils/prop-is-nil'
import type { NonEmptyArray } from '@echo/utils/types'
import { forEach, map, path, pipe, uniq } from 'ramda'

export function getListingTargetsCollectionIds(targets: NonEmptyArray<ListingTarget>) {
  forEach((target: ListingTarget) => {
    if (propIsNil('collection', target) || pathIsNil(['collection', 'id'], target)) {
      throw Error('not every targets have a collection')
    }
  }, targets)
  return pipe(map(path(['collection', 'id'])), uniq)(targets) as string[]
}
