import { ListingTarget } from '@echo/firestore-types'
import { NonEmptyArray, propIsNil } from '@echo/utils'
import { pathIsNil } from '@echo/utils/src/fp/path-is-nil'
import { forEach, map, path, pipe, uniq } from 'ramda'

export function getListingTargetsCollectionIds(targets: NonEmptyArray<ListingTarget>) {
  forEach((target: ListingTarget) => {
    if (propIsNil('collection', target) || pathIsNil(['collection', 'id'], target)) {
      throw Error('not every targets have a collection')
    }
  }, targets)
  return pipe(map(path(['collection', 'id'])), uniq)(targets) as string[]
}
