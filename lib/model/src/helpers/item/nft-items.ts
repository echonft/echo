import { erc1155Items } from '@echo/model/helpers/item/erc1155-items'
import { erc721Items } from '@echo/model/helpers/item/erc721-items'
import type { AbstractItem } from '@echo/model/types/item/abstract-item'
import type { NftItem } from '@echo/model/types/item/nft-item'
import { flatten, juxt, pipe } from 'ramda'

export function nftItems(items: AbstractItem[]): NftItem[] {
  return pipe(juxt([erc721Items, erc1155Items]), flatten)(items)
}
