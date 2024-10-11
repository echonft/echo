import { erc1155Items } from '@echo/model/helpers/item/erc1155-items'
import { erc721Items } from '@echo/model/helpers/item/erc721-items'
import type { Item, Items } from '@echo/model/types/item'
import type { NftToken } from '@echo/model/types/token'
import { flatten, juxt, type NonEmptyArray, pipe } from 'ramda'

export function nftItems(items: Items): NonEmptyArray<Item<NftToken>> {
  return pipe(juxt([erc721Items, erc1155Items]), flatten)(items) as NonEmptyArray<Item<NftToken>>
}
