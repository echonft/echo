import { erc1155Items } from '@echo/model/helpers/item/erc1155-items'
import { erc20Items } from '@echo/model/helpers/item/erc20-items'
import { erc721Items } from '@echo/model/helpers/item/erc721-items'
import type { Items } from '@echo/model/types/item'
import { allPass, isEmpty, pipe } from 'ramda'

export function itemsEmpty(items: Items): boolean {
  return allPass([pipe(erc20Items, isEmpty), pipe(erc721Items, isEmpty), pipe(erc1155Items, isEmpty)])(items)
}
