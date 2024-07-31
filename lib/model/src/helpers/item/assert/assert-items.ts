import { getNftIndex } from '@echo/model/helpers/nft/get-nft-index'
import type { NftIndex, OwnedNft } from '@echo/model/types/nft'
import type { User } from '@echo/model/types/user'
import { complement, dissoc, equals, isEmpty, length, map, type NonEmptyArray, pipe, prop, uniq } from 'ramda'

/**
 * Asserts the validity of items
 * @param items
 */
export function assertItems(items: OwnedNft[]): asserts items is NonEmptyArray<OwnedNft> {
  if (isEmpty(items)) {
    throw Error('empty items')
  }
  // make sure all items are different
  if (
    pipe<[OwnedNft[]], NftIndex[], NftIndex[], number, boolean>(
      map(getNftIndex),
      uniq,
      length,
      complement(equals(items.length))
    )(items)
  ) {
    throw Error('duplicate items found')
  }
  // make sure all items have the same owner
  if (
    pipe<[OwnedNft[]], Omit<User, 'discord'>[], Omit<User, 'discord'>[], number, boolean>(
      map(pipe(prop('owner'), dissoc('discord'))),
      uniq,
      length,
      complement(equals(1))
    )(items)
  ) {
    throw Error('not all items have the same owner')
  }
}
