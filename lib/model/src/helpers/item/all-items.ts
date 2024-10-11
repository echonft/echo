import { erc1155Items } from '@echo/model/helpers/item/erc1155-items'
import { erc20Items } from '@echo/model/helpers/item/erc20-items'
import { erc721Items } from '@echo/model/helpers/item/erc721-items'
import type { Item, Items } from '@echo/model/types/item'
import type { Token } from '@echo/model/types/token'
import { flatten, juxt, pipe } from 'ramda'

export function allItems(items: Items): Item<Token>[] {
  return pipe(juxt([erc20Items, erc721Items, erc1155Items]), flatten)(items)
}
