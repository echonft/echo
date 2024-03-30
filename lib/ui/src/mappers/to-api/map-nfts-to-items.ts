import type { Item } from '@echo/model/types/item'
import type { Nft } from '@echo/model/types/nft'
import { mapNftToItem } from '@echo/ui/mappers/to-api/map-nft-to-item'
import { map } from 'ramda'

export function mapNftsToItems<T extends Item>(nfts: Nft[]): T[] {
  return map(mapNftToItem<T>, nfts)
}
