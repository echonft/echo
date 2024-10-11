import { ItemError } from '@echo/model/constants/errors/item/item-error'
import { allItems } from '@echo/model/helpers/item/all-items'
import { itemsEmpty } from '@echo/model/helpers/item/items-empty'
import { eqNft } from '@echo/model/helpers/nft/eq-nft'
import { eqErc20Token } from '@echo/model/helpers/token/eq-erc20-token'
import type { Item, Items } from '@echo/model/types/item'
import type { Erc1155Token, Erc20Token, Erc721Token, Token } from '@echo/model/types/token'
import { hasDuplicates } from '@echo/utils/fp/has-duplicates'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { throwError } from '@echo/utils/fp/throw-error'
import type { ChainName } from '@echo/utils/types/chain-name'
import {
  __,
  allPass,
  anyPass,
  equals,
  gt,
  includes,
  isEmpty,
  isNotEmpty,
  length,
  map,
  path,
  pipe,
  prop,
  uniq
} from 'ramda'

function itemsToken<T extends Token>(items: Item<T>[]): T[] {
  return map<Item<T>, T>(prop('token'))(items)
}
/**
 * Asserts the validity of items
 * @param items
 */
export function assertItems(items: Items) {
  if (itemsEmpty(items)) {
    throw Error(ItemError.EMPTY)
  }
  if (
    anyPass([
      pipe(prop('erc20'), itemsToken<Erc20Token>, hasDuplicates(eqErc20Token)),
      pipe(prop('erc721'), itemsToken<Erc721Token>, hasDuplicates(eqNft)),
      pipe(prop('erc1155'), itemsToken<Erc1155Token>, hasDuplicates(eqNft))
    ])(items)
  ) {
    throwError(ItemError.DUPLICATES)
  }
  if (
    pipe(
      allItems,
      map<Item<Token>, ChainName>(nonNullableReturn(path(['token', 'contract', 'chain']))),
      uniq,
      length,
      gt(__, 1)
    )(items)
  ) {
    throwError(ItemError.CHAIN)
  }
  if (
    anyPass([
      pipe(prop('erc20'), map<Item<Erc20Token>, boolean>(pipe(prop('quantity'), gt(__, 0))), includes(false)),
      pipe(prop('erc721'), map<Item<Erc721Token>, boolean>(pipe(prop('quantity'), equals(1))), includes(false)),
      pipe(prop('erc1155'), map<Item<Erc1155Token>, boolean>(pipe(prop('quantity'), gt(__, 0))), includes(false))
    ])(items)
  ) {
    throwError(ItemError.QUANTITY)
  }
  if (
    allPass([pipe(prop('erc20'), isNotEmpty), pipe(prop('erc721'), isEmpty), pipe(prop('erc1155'), isEmpty)])(items)
  ) {
    throw Error(ItemError.ONLY_ERC20)
  }
}
