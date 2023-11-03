import type { Collection } from '@echo/model/types/collection'
import type { Item } from '@echo/model/types/item'
import type { Nft } from '@echo/model/types/nft'
import type { User } from '@echo/model/types/user'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { pathIsNil } from '@echo/utils/fp/path-is-nil'
import { propIsNil } from '@echo/utils/fp/prop-is-nil'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'
import { complement, eqProps, equals, forEach, isEmpty, length, map, path, pipe, prop, uniqWith } from 'ramda'

/**
 * Asserts the validity of items
 * @param items
 */
export function assertItems(items: Item[]): asserts items is NonEmptyArray<Item> {
  if (isEmpty(items)) {
    throw Error('empty items')
  }
  forEach((item: Item) => {
    if (propIsNil('nft', item) || pathIsNil(['nft', 'id'], item) || pathIsNil(['nft', 'tokenId'], item)) {
      throw Error('not every items have an nft with a token id')
    }
    if (pathIsNil(['nft', 'collection'], item) || pathIsNil(['nft', 'collection', 'id'], item)) {
      throw Error('not every items have an nft with a collection')
    }
    if (pathIsNil(['nft', 'owner'], item) || pathIsNil(['nft', 'owner', 'wallet'], item)) {
      throw Error('not every items have an nft with an owner')
    }
  }, items)
  // make sure all items are from the same collection
  if (
    pipe<[Item[]], Collection[], Collection[], number, boolean>(
      map(nonNullableReturn(path(['nft', 'collection']))),
      uniqWith(eqProps('id')),
      length,
      complement(equals(1))
    )(items)
  ) {
    throw Error('listing items are not all in the same collection')
  }
  // make sure all items tokenIds are different
  if (
    pipe<[Item[]], Nft[], Nft[], number, boolean>(
      map(prop('nft')),
      uniqWith(eqProps('tokenId')),
      length,
      complement(equals(items.length))
    )(items)
  ) {
    throw Error('some listing items have identical tokenId')
  }
  // make sure all items ids are different
  if (
    pipe<[Item[]], Nft[], Nft[], number, boolean>(
      map(prop('nft')),
      uniqWith(eqProps('id')),
      length,
      complement(equals(items.length))
    )(items)
  ) {
    throw Error('some listing items have identical id')
  }
  // make sure all items have the same wallet
  if (
    pipe<[Item[]], User[], User[], number, boolean>(
      map(nonNullableReturn(path(['nft', 'owner']))),
      uniqWith(eqProps('wallet')),
      length,
      complement(equals(1))
    )(items)
  ) {
    throw Error('not all listing items are owned by the same wallet')
  }
}
