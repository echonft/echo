import { ListingTarget } from '../../types/model/listing-target'
import { NonEmptyArray } from '@echo/utils'
import { complement, eqProps, equals, length, map, pipe, prop, uniqWith } from 'ramda'

/**
 * Asserts the validity of listing targets
 * @param targets
 */
export const assertListingTargets = (targets: NonEmptyArray<ListingTarget>) => {
  // make sure all items ids are different
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (pipe(map(prop('collection')), uniqWith(eqProps('id')), length, complement(equals(targets.length)))(targets)) {
    throw Error('some listing targets are identical')
  }
}
