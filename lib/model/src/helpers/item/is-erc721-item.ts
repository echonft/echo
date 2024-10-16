import { isErc721Token } from '@echo/model/helpers/token/is-erc721-token'
import type { Erc721Item } from '@echo/model/types/item/erc721-item'
import type { Item } from '@echo/model/types/item/item'
import { pipe, prop } from 'ramda'

export function isErc721Item(item: Item): item is Erc721Item {
  return pipe(prop('token'), isErc721Token)(item)
}
