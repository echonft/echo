import { OfferItem } from '../../types/model/offer-item'
import { NonEmptyArray } from '@echo/utils'
import { complement, eqProps, equals, length, map, path, pipe, prop, uniqWith } from 'ramda'

/**
 * Asserts the validity of offer items
 * @param items
 */
export const assertOfferItems = (items: NonEmptyArray<OfferItem>) => {
  // all listing items must be from the same collection to be valid
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (pipe(map(path(['nft', 'collection'])), uniqWith(eqProps('id')), length, complement(equals(1)))(items)) {
    throw Error('offer items are not all in the same collection')
  }
  // make sure all items tokenIds are different
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (pipe(map(prop('nft')), uniqWith(eqProps('tokenId')), length, complement(equals(items.length)))(items)) {
    throw Error('some offer items have identical tokenId')
  }
  // make sure all items ids are different
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (pipe(map(prop('nft')), uniqWith(eqProps('id')), length, complement(equals(items.length)))(items)) {
    throw Error('some offer items have identical id')
  }
  // make sure all items have the same wallet
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (pipe(map(path(['nft', 'owner'])), uniqWith(eqProps('wallet')), length, complement(equals(1)))(items)) {
    throw Error('not all offer items are owned by the same wallet')
  }
}
