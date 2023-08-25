import { ListingItem } from '../../types/model/listing-item'
import { NonEmptyArray } from '@echo/utils'
import { complement, eqProps, equals, length, map, path, pipe, prop, uniqWith } from 'ramda'

/**
 * Asserts the validity of offer items
 * @param items
 */
export function assertListingItems(items: NonEmptyArray<ListingItem>) {
  // all items must be from the same collection to be valid
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (pipe(map(path(['nft', 'collection'])), uniqWith(eqProps('id')), length, complement(equals(1)))(items)) {
    throw Error('listing items are not all in the same collection')
  }
  // make sure all items tokenIds are different
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (pipe(map(prop('nft')), uniqWith(eqProps('tokenId')), length, complement(equals(items.length)))(items)) {
    throw Error('some listing items have identical tokenId')
  }
  // make sure all items ids are different
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (pipe(map(prop('nft')), uniqWith(eqProps('id')), length, complement(equals(items.length)))(items)) {
    throw Error('some listing items have identical id')
  }
  // make sure all items have the same wallet
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (pipe(map(path(['nft', 'owner'])), uniqWith(eqProps('wallet')), length, complement(equals(1)))(items)) {
    throw Error('not all listing items are owned by the same wallet')
  }
}
