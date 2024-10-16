import { isErc1155Token } from '@echo/model/helpers/token/is-erc1155-token'
import type { Erc1155Item } from '@echo/model/types/item/erc1155-item'
import type { Item } from '@echo/model/types/item/item'
import { pipe, prop } from 'ramda'

export function isErc1155Item(item: Item): item is Erc1155Item {
  return pipe(prop('token'), isErc1155Token)(item)
}
