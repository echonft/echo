import { isErc20Token } from '@echo/model/helpers/token/is-erc20-token'
import type { Erc20Item } from '@echo/model/types/item/erc20-item'
import type { Item } from '@echo/model/types/item/item'
import { pipe, prop } from 'ramda'

export function isErc20Item(item: Item): item is Erc20Item {
  return pipe(prop('token'), isErc20Token)(item)
}
