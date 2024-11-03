import { itemToken } from '@echo/model/helpers/item/item-token'
import { isErc1155Token } from '@echo/model/helpers/token/is-erc1155-token'
import type { AbstractItem, Erc1155Item } from '@echo/model/types/item'
import { pipe } from 'ramda'

export function isErc1155Item(item: AbstractItem): item is Erc1155Item {
  return pipe(itemToken, isErc1155Token)(item)
}
