import { itemToken } from '@echo/model/helpers/item/item-token'
import { isErc721Token } from '@echo/model/helpers/token/is-erc721-token'

import type { AbstractItem, Erc721Item } from '@echo/model/types/item'
import { pipe } from 'ramda'

export function isErc721Item(item: AbstractItem): item is Erc721Item {
  return pipe(itemToken, isErc721Token)(item)
}
