import type { FirestoreListingTarget } from '@echo/firestore/types/model/firestore-listing-target'
import { pathIsNil } from '@echo/utils/fp/path-is-nil'
import { propIsNil } from '@echo/utils/fp/prop-is-nil'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'
import { forEach, map, path, pipe, uniq } from 'ramda'

export function getListingTargetsCollectionIds(targets: NonEmptyArray<FirestoreListingTarget>) {
  forEach((target: FirestoreListingTarget) => {
    if (propIsNil('collection', target) || pathIsNil(['collection', 'id'], target)) {
      throw Error('not every targets have a collection')
    }
  }, targets)
  return pipe(map(path(['collection', 'id'])), uniq)(targets) as string[]
}
