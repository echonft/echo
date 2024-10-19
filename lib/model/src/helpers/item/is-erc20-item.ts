import { itemToken } from '@echo/model/helpers/item/item-token'
import { isErc20Token } from '@echo/model/helpers/token/is-erc20-token'
import type { AbstractItem } from '@echo/model/types/item/abstract-item'
import type { Erc20Item } from '@echo/model/types/item/erc20-item'
import { pipe } from 'ramda'

export function isErc20Item(item: AbstractItem): item is Erc20Item {
  return pipe(itemToken, isErc20Token)(item)
}
