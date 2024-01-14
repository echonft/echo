import type { Item } from '@echo/model/types/item'
import { type Nft } from '@echo/model/types/nft'

/**
 * Map an NFT to an Item
 * TODO For now, we simply assign an amount of 1 since we only support ERC721
 * @param nft The NFT for the offer
 * @return Item
 */
export function mapNftToItem(nft: Nft): Item {
  return { nft, amount: 1 }
}
