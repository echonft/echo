import { itemToken } from '@echo/model/helpers/item/item-token'
import { isErc721Token } from '@echo/model/helpers/token/is-erc721-token'
import type { AbstractItem } from '@echo/model/types/abstract-item'
import type { Erc721Item } from '@echo/model/types/erc721-item'
import { pipe } from 'ramda'

export function isErc721Item(item: AbstractItem): item is Erc721Item {
  return pipe(itemToken, isErc721Token)(item)
}
