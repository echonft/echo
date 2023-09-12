import { ListingItem } from '@echo/firestore-types'
import pathIsNil from '@echo/utils/path-is-nil'
import propIsNil from '@echo/utils/prop-is-nil'
import type { NonEmptyArray } from '@echo/utils/types'
import { complement, eqProps, equals, forEach, length, map, path, pipe, prop, uniqWith } from 'ramda'

/**
 * Asserts the validity of offer items
 * @param items
 */
export function assertListingItems(items: NonEmptyArray<ListingItem>) {
  forEach((item: ListingItem) => {
    if (propIsNil('nft', item) || pathIsNil(['nft', 'id'], item) || pathIsNil(['nft', 'tokenId'], item)) {
      throw Error('not every items have an nft with a token id')
    }
    if (pathIsNil(['nft', 'collection'], item) || pathIsNil(['nft', 'collection', 'id'], item)) {
      throw Error('not every items have an nft with a collection')
    }
    if (
      pathIsNil(['nft', 'owner'], item) ||
      pathIsNil(['nft', 'owner', 'id'], item) ||
      pathIsNil(['nft', 'owner', 'wallet'], item)
    ) {
      throw Error('not every items have an nft with an owner')
    }
  }, items)
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
