import { OfferItem } from '../../types/model/offer-item'
import { NonEmptyArray } from '@echo/utils'
import { complement, eqProps, equals, length, map, pipe, prop, uniqWith } from 'ramda'

/**
 * Asserts the validity of listing target items
 * @param items
 */
export const assertOfferItems = (items: NonEmptyArray<OfferItem>) => {
  // all listing items must be from the same collection to be valid
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (pipe(map(prop('collection')), uniqWith(eqProps('id')), length, complement(equals(1)))(items)) {
    throw Error('listing items are not all in the same collection')
  }
  // make sure all items are different
  if (pipe(uniqWith(eqProps('tokenId')), length, complement(equals(items.length)))(items)) {
    throw Error('some listing items identical')
  }
  // make sure all items have the same wallet
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (pipe(map(prop('owner')), uniqWith(eqProps('wallet')), length, complement(equals(1)))(items)) {
    throw Error('listing items are not all owned by the same wallet')
  }
}
