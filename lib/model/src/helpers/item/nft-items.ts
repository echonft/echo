import { erc1155Items } from '@echo/model/helpers/item/erc1155-items'
import { erc721Items } from '@echo/model/helpers/item/erc721-items'
import type { AbstractItem } from '@echo/model/types/item/abstract-item'
import type { NftItem } from '@echo/model/types/item/nft-item'
import { concat, converge, type NonEmptyArray } from 'ramda'

export function nftItems<T extends AbstractItem[]>(
  items: T
): T extends NonEmptyArray<AbstractItem> ? NonEmptyArray<NftItem> : NftItem[] {
  return converge(concat, [erc721Items, erc1155Items])(items) as unknown as T extends NonEmptyArray<AbstractItem>
    ? NonEmptyArray<NftItem>
    : NftItem[]
}
