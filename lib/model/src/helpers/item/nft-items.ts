import { erc1155Items } from '@echo/model/helpers/item/erc1155-items'
import { erc721Items } from '@echo/model/helpers/item/erc721-items'
import type { Erc1155Item } from '@echo/model/types/item/erc1155-item'
import type { Erc721Item } from '@echo/model/types/item/erc721-item'
import type { Item } from '@echo/model/types/item/item'
import { flatten, juxt, pipe } from 'ramda'

export function nftItems(items: Item[]): (Erc721Item | Erc1155Item)[] {
  return pipe(juxt([erc721Items, erc1155Items]), flatten)(items)
}
