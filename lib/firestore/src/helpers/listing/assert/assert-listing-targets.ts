import { ListingTarget } from '@echo/firestore-types'
import { NonEmptyArray, propIsNil } from '@echo/utils'
import { pathIsNil } from '@echo/utils/src/fp/path-is-nil'
import { complement, eqProps, equals, forEach, length, map, pipe, prop, uniqWith } from 'ramda'

/**
 * Asserts the validity of listing targets
 * @param targets
 */
export const assertListingTargets = (targets: NonEmptyArray<ListingTarget>) => {
  forEach((target: ListingTarget) => {
    if (propIsNil('collection', target) || pathIsNil(['collection', 'id'], target)) {
      throw Error('not every targets have a collection')
    }
  }, targets)
  // make sure all items ids are different
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (pipe(map(prop('collection')), uniqWith(eqProps('id')), length, complement(equals(targets.length)))(targets)) {
    throw Error('some listing targets are identical')
  }
}
