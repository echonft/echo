import { eqNft } from '@echo/model/helpers/nft/eq-nft'
import { eqOwnedNftOwner } from '@echo/model/helpers/nft/eq-owned-nft-owner'
import type { OwnedNft } from '@echo/model/types/nft'
import { complement, equals, isEmpty, length, type NonEmptyArray, pipe, uniqWith } from 'ramda'

/**
 * Asserts the validity of items
 * @param items
 */
export function assertItems(items: OwnedNft[]): asserts items is NonEmptyArray<OwnedNft> {
  if (isEmpty(items)) {
    throw Error('empty items')
  }
  // make sure all items are different
  if (pipe(uniqWith(eqNft), length, complement(equals(items.length)))(items)) {
    throw Error('duplicate items found')
  }
  // make sure all items have the same owner
  if (pipe(uniqWith(eqOwnedNftOwner), length, complement(equals(1)))(items)) {
    throw Error('not all items have the same owner')
  }
}
